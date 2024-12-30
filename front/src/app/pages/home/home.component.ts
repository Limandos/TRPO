import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reportsChapters: {
    name: string,
    reports: Report[]
  }[] = [];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {

    const groupByChapter = (array: any[]) => {
      const grouped = array.reduce((accumulator, object) => {
        const groupKey = object.chapter;
        let group = accumulator.find((g: { name: any; }) => g.name === groupKey);

        if (!group) {
          group = { name: groupKey, reports: [] };
          accumulator.push(group);
        }

        group.reports.push(object);
        return accumulator;
      }, []);

      return grouped;
    };

    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.reportsChapters = groupByChapter(reports);
      }
    });
  }
}
