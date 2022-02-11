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
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angular2-qrcode';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [...fromComponents.components, ConfirmationDialog, AboutAppDialogComponent],
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
    NgbCarouselModule,
    QRCodeModule,
    PdfViewerModule
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
    NgbCarouselModule,
    NgxBarcodeModule,
    QRCodeModule,
    PdfViewerModule
  ]
})
export class SharedModule { }
