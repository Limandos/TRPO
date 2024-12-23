import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {Router} from "@angular/router";
import {Report} from "../../models/report";

@Component({
  selector: 'app-journal',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports!: Report[]

  constructor(private router: Router, private reportService: ReportService) {

  }

  ngOnInit() {
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      }
    });
  }
}