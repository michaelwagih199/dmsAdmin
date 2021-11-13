import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

interface ImagesModel {
  src: string;
  header: string;
  discription: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    this.config.interval = 10000;
    this.config.wrap = false;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
  }

  ngOnInit(): void {}
  images: ImagesModel[] = [
    { src: 'assets/homeBg.png', header: 'Magic Line Petroleum Services & Agencies', discription: '' },
    // { src: 'assets/home.jpg', header: 'Do your Work Quietly', discription: '' },
    // { src: 'assets/home5.jpg', header: 'Never Stop Dreaming', discription: '' },
  ];

}
