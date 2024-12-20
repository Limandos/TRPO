package com.example.reports.api.dto;

import com.example.reports.domain.Report;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReportDto {
    private Long id;
    private Integer version;
    private String name;
    private List<ReportValue> values;

    public static ReportDto fromDomain(Report report) {
        try {
            var mapper = new ObjectMapper();

            var result = new ReportDto();
            result.id = report.getId();
            result.version = report.getVersion();
            result.name = report.getName();
            result.values = Arrays.stream(mapper.readValue(report.getValues(), ReportValue[].class)).toList();

            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Report toDomain() {
        try {
            var mapper = new ObjectMapper();

            var result = new Report();
            result.setId(id);
            result.setVersion(version);
            result.setName(name);
            result.setValues(mapper.writeValueAsString(values));

            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}