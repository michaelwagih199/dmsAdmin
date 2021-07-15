import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import * as fromComponents from './components';
import { NgMaterialModule } from './components/ng-material/ng-material.module';
import { ConfirmationDialog } from './components/layout/dialog/confirmation/confirmation.component';
import { AboutAppDialogComponent } from './components/layout/dialog/about-app-dialog/about-app-dialog.component';
import { NgZorroModule } from './components/ng-zorro/ng-zorro.module';
import { ImagesComponent } from './components/layout/dialog/images/images.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [...fromComponents.components, ConfirmationDialog,ImagesComponent, AboutAppDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgMaterialModule,
    NgxPaginationModule,
    NgZorroModule,
    NgbCarouselModule
   ],
  exports: [   
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    NgMaterialModule,
    NgxPaginationModule,
    NgZorroModule,
    NgbCarouselModule
  ]
})
export class SharedModule { }
