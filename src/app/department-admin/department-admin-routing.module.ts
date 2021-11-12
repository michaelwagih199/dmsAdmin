import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from '../core/services/auth-gaurd.service';
import { DepartmentAdminHomeComponent } from './components/department-admin-home/department-admin-home.component';
import { LayoutDepartmentAdminComponent } from './components/layout-department-admin/layout-department-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDepartmentAdminComponent,
    // children: [
    //   {
    //     path: '',
    //     component: DepartmentAdminHomeComponent,
    //     canActivate: [AuthGaurdService],
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentAdminRoutingModule { }
