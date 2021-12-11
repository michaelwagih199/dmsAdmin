import {
  AfterViewChecked,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocDtoModel } from 'src/app/department-admin/models/docsDto';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-parcode',
  templateUrl: './parcode.component.html',
  styleUrls: ['./parcode.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParcodeComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscription!: Subscription;
  sharedData!: DocDtoModel;
  code: any;

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe((message) => {
      console.log(message);
      this.sharedData = message;
      this.code = JSON.stringify(this.sharedData);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    // window.print();
  }

  @HostListener('window:afterprint')
  onBeforePrint() {
    this.toSaleOrder('admin');
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  toSaleOrder(val: any) {
    this.redirectTo(`/${val}`);
  }
}
