package com.example.reports.api;

import com.example.reports.services.dto.ReportDto;
import com.example.reports.services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/getReports")
    public List<ReportDto> getReports() {
        return reportService.getAll();
    }

    @GetMapping("/getReportById/{id}")
    public ReportDto getReportById(@PathVariable Long id) {
        return reportService.getById(id);
    }

    @PostMapping("/createReport")
    public ReportDto createReport(@RequestBody ReportDto reportDto) {
        return reportService.create(reportDto);
    }

    @PutMapping("/updateReport")
    public void updateReport(@RequestBody ReportDto reportDto) {
        reportService.update(reportDto);
    }

    @DeleteMapping("/deleteReport/{reportId}")
    public void deleteReport(@PathVariable Long reportId) {
        reportService.delete(reportId);
    }
}