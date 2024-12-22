package com.example.reports.services;

import com.example.reports.domain.ReportRepository;
import com.example.reports.services.dto.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final WebClient authWebClient;

    public List<ReportDto> getAll() {
        return reportRepository.findAll().stream().map(ReportDto::fromDomain).toList();
    }

    public ReportDto create(ReportDto reportDto) {
        reportDto.setVersion(1);
        var report = reportRepository.save(reportDto.toDomain());
        reportDto.setId(report.getId());

        return reportDto;
    }

    public void update(ReportDto reportDto) {
        reportRepository
                .findReportById(reportDto.getId())
                .orElseThrow(() -> new RuntimeException("Нет такого отчёта"));

        reportRepository.save(reportDto.toDomain());
    }

    public void delete(Long id) {
        var report = reportRepository
                .findReportById(id)
                .orElseThrow(() -> new RuntimeException("Нет такого отчёта"));

        reportRepository.delete(report);
    }

    public String getReportAuthor(Long authorId) {
        return this.authWebClient.post()
                .uri(ub -> ub.path("/users/GetById/" + authorId).build())
                .retrieve()
                .bodyToMono(String.class)
                .retryWhen(Retry.fixedDelay(2L, Duration.ofSeconds(1)))
                .block();
    }
}