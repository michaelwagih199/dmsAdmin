import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintingRoutingModule } from './printing-routing.module';
import { ParcodeComponent } from './parcode/parcode.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ParcodeComponent],
  imports: [
    CommonModule,
    PrintingRoutingModule,
    SharedModule
  ]
})
export class PrintingModule { }
