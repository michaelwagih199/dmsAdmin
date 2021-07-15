import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdminHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentComponent } from './components/department/department.component';
import { ReportListComponent } from './components/reports/report-list/report-list.component';
import { DocCodesComponent } from './components/reports/doc-codes/doc-codes.component';

@NgModule({
  declarations: [AdminHomeComponent, DepartmentComponent, ReportListComponent, DocCodesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }
