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
import { MoveDocComponent } from './components/dialogs/move-doc/move-doc.component';
import { SearchComponent } from './components/dialogs/search/search.component';
import { ImagesComponent } from './components/dialogs/images/images.component';
import { BarcodeComponent } from './components/dialogs/barcode/barcode.component';
import { MyFolderComponent } from './components/dialogs/my-folder/my-folder.component';
import { MultibleSearchComponent } from './components/dialogs/multible-search/multible-search.component';
import { MultiDeleteDialogComponent } from './components/dialogs/multi-delete-dialog/multi-delete-dialog.component';
import { AddDocPlaceComponent } from './components/dialogs/add-doc-place/add-doc-place.component';


@NgModule({
  declarations: [
    DepartmentAdminHomeComponent,
    LayoutDepartmentAdminComponent,
    NavbarDepartmentAdminComponent,
    AddFolderComponent,
    DocTypeComponent,
    AddDocsComponent,
    MoveDocComponent,
    SearchComponent,
    MultibleSearchComponent,
    ImagesComponent,
    BarcodeComponent,
    MyFolderComponent,
    MultiDeleteDialogComponent,
    AddDocPlaceComponent,
  ],
  imports: [
    CommonModule,
    DepartmentAdminRoutingModule,
    SharedModule

  ]
})
export class DepartmentAdminModule { }
