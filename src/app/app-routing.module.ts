import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-home/home.module').then(m => m.AdminHomeModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'departmentAdmnin/:id',
    loadChildren: () => import('./department-admin/department-admin.module').then(m => m.DepartmentAdminModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
