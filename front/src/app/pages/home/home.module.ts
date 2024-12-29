import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from "@angular/router";
import { CollapseComponent } from "../../components/collapse/collapse.component";
import { ReportService } from 'src/app/services/report.service';

@NgModule({
  declarations: [
    HomeComponent, CollapseComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild([
          {
              path: '',
              component: HomeComponent,
          },
      ])
  ],
  exports: [HomeComponent],
  providers: [
    ReportService,
  ]
})
export class HomeModule { }