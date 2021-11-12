import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcodeComponent } from './parcode/parcode.component';

const routes: Routes = [
  {
    path: 'parcode',
    component: ParcodeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingRoutingModule { }
