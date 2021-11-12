import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FileServiceService } from 'src/app/admin-home/services/file-service.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  imageSrc!: string;
  imageToShow: any;
  isLoading: boolean = false;
  cycleId: any;
  url: any;
  fileName: any;
  private baseUrl = `${environment.baseUrl}/files`;

  constructor(
    private service: FileServiceService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<ImagesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data != null) {
      this.fileName = data;
      console.log(data);
    } else {
    }
  }

  ngOnInit(): void {
    // this.isLoading = true;
    // this.service.getImageByName(this.cycleId).subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     this.fileName = response.fileName;
    //     this.url = `${this.baseUrl}/download/${response.fileName}`
    //     this.getImageFromService();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  getImageFromService() {
    this.isLoading = true;
    this.service.getImageByName(this.fileName).subscribe(
      (data) => {
        this.isLoading = false;
        this.createImageFromBlob(data);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  onDocsDownload() {
    this.isLoading = true;
    this.service.getfile(this.fileName).subscribe((response) => {
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, this.fileName);
      this.isLoading = false;
    }),
      () => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  close() {
    this.dialogRef.close();
  }
}
