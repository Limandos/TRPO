import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsComponent} from './reports.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ReportService} from "../../services/report.service";

@NgModule({
  declarations: [
    ReportsComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReportsComponent,
            },
        ]),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [
    ReportService
  ],
  exports: [
    ReportsComponent
  ],
})
export class ReportsModule {
}