import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/components';
import { AuthGaurdService } from '../core/services/auth-gaurd.service';
import { AdminHomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { DocCodesComponent } from './components/reports/doc-codes/doc-codes.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'reports',
        component: DocCodesComponent,
        canActivate: [AuthGaurdService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
