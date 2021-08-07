import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentAdminRoutingModule } from './department-admin-routing.module';
import { DepartmentAdminHomeComponent } from './components/department-admin-home/department-admin-home.component';
import { LayoutDepartmentAdminComponent } from './components/layout-department-admin/layout-department-admin.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarDepartmentAdminComponent } from './components/navbar-department-admin/navbar-department-admin.component';
import { AddFolderComponent } from './components/dialogs/add-folder/add-folder.component';
import { DocTypeComponent } from './components/dialogs/doc-type/doc-type.component';
import { AddDocsComponent } from './components/dialogs/add-docs/add-docs.component';


@NgModule({
  declarations: [
    DepartmentAdminHomeComponent,
    LayoutDepartmentAdminComponent,
    NavbarDepartmentAdminComponent,
    AddFolderComponent,
    DocTypeComponent,
    AddDocsComponent,
  ],
  imports: [
    CommonModule,
    DepartmentAdminRoutingModule,
    SharedModule

  ]
})
export class DepartmentAdminModule { }
