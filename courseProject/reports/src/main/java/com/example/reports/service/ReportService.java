package com.example.reports.service;

import com.example.reports.api.dto.ReportDto;
import com.example.reports.domain.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    public List<ReportDto> getAll() {
        return reportRepository.findAll().stream().map(ReportDto::fromDomain).toList();
    }

    public ReportDto create(ReportDto reportDto) {
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
}
