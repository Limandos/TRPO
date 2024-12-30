import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Report} from "../../models/report";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ReportValue } from 'src/app/models/reportValue';

@Component({
  selector: 'app-journal',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit {
[x: string]: any;
  report!: Report | undefined;
  values: ReportValue[] = [];
  reportId: number | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private reportService: ReportService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.reportId = Number(params['reportId']);

      if (this.reportId) {
        this.reportService.getReportById(this.reportId).subscribe({
          next: (data) => {
            this.report = data;
            this.values = data.values;
          }
        });
      }
    })
  }

  delete(){
    this.activatedRoute.params.subscribe((params) => {
      this.reportId = Number(params['reportId']);

      this.reportService.deleteReport(this.reportId).subscribe(() => {
        this.router.navigate(['/']) ;
      });
    })
  }

  save(name: string, chapter: string){
    console.log(this.values);

    if(this.reportId){
      this.reportService.updateReport(this.reportId, name, chapter, this.values)
        .pipe(
          catchError(err => this.errHandler(err))
        )
        .subscribe(() => {
        this.router.navigate(['/']) ;
      });
    }
    else {
      this.reportService.createReport(name, chapter, this.values)
        .pipe(
          catchError(err => this.errHandler(err))
        )
        .subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
  errHandler(error:HttpErrorResponse){
    alert("Что-то пошло не так");
    return throwError(() => error.message);
  }

  addValue() {
    this.values.push({ } as ReportValue);
  }
}