import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { DocTypeModel } from 'src/app/department-admin/models/docTypeModel';
import { DocTypeService } from 'src/app/department-admin/services/doc-type.service';
import { DocsService } from 'src/app/department-admin/services/docs.service';
import { CodePlacesModel } from 'src/app/setting/models/docPlaces';
import { DocPlacesService } from 'src/app/setting/services/doc-places.service';
import { DocsModel } from '../../../models/docsModel';

interface FolderStructure {
  id: string;
  name: any;
  children?: FolderStructure[];
}

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.scss'],
})
export class AddDocsComponent implements OnInit {
  breadcrumbList: FolderStructure[] = [];
  departmentId: any;
  docs: DocsModel = new DocsModel();
  validateForm!: FormGroup;
  docsPlaces!: CodePlacesModel[];
  docTypeList!: DocTypeModel[];
  isLoading: boolean = false;
  isUpdate: boolean = false;

  /**upload file */
  uploading = false;
  isUploadImpty: boolean = true;
  fileList: NzUploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDocsComponent>,
    private notification: NzNotificationService,
    private docTypeService: DocTypeService,
    private docsService: DocsService,
    private docPlacesService: DocPlacesService,
    private http: HttpClient,
    private msg: NzMessageService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.model) {
      this.docs = data.model;
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
      this.docs = new DocsModel();
    }

    this.departmentId = data.departmentId;
    this.breadcrumbList = data.breadcrumbList;
  }

  ngOnInit(): void {
    this.validateform();
    this.getAllDocTypeById();
    this.getAllDOcPlaces();
  }

  /**data */
  getAllDOcPlaces() {
    this.isLoading = true;
    this.docPlacesService.findAll().subscribe(
      (data) => {
        this.docsPlaces = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  getAllDocTypeById() {
    this.isLoading = true;
    this.docTypeService.findByDepartment(this.departmentId).subscribe(
      (data) => {
        this.docTypeList = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  /**EVENT */

  close() {
    this.dialogRef.close();
  }

  uploadImage() {
    if (this.isUpdate) {
      this.isLoading = true;
      const formData = new FormData();
      this.docs.departmentId = this.departmentId;
      this.docs.parentId =
        this.breadcrumbList[this.breadcrumbList.length - 1].id;
      let nDocs = {
        docCode: this.docs.docCode,
        docTitle: this.docs.docTitle,
        docOwner: this.docs.docOwner,
        dateInDoc: this.docs.dateInDoc,
        parentId: this.docs.parentId,
        docsPlacesId: this.docs.docsPlacesId,
        docsTypeId: this.docs.docsTypeId,
        departmentId: this.docs.departmentId,
        comment:this.docs.comment,
        fileName:this.docs.fileName,
      };
      formData.append('docs', JSON.stringify(nDocs));
      // tslint:disable-next-line:no-any
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });

      this.uploading = true;
      // You can use any AJAX library you like
      const req = new HttpRequest(
        'PUT',
        `http://localhost:8080/api/docs/${this.docs.id}`,
        formData,
        {
          // reportProgress: true
        }
      );
      this.http
        .request(req)
        .pipe(filter((e) => e instanceof HttpResponse))
        .subscribe(
          () => {
            this.uploading = false;
            this.fileList = [];
            this.msg.success('upload successfully.');
          },
          () => {
            this.uploading = false;
            this.msg.error('upload failed.');
          }
        );
    } else {
      this.isLoading = true;
      const formData = new FormData();
      this.docs.departmentId = this.departmentId;
      this.docs.parentId =
        this.breadcrumbList[this.breadcrumbList.length - 1].id;
      formData.append('docs', JSON.stringify(this.docs));
      // tslint:disable-next-line:no-any
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });

      this.uploading = true;
      // You can use any AJAX library you like
      const req = new HttpRequest(
        'POST',
        `http://localhost:8080/api/docs/upload`,
        formData,
        {
          // reportProgress: true
        }
      );
      this.http
        .request(req)
        .pipe(filter((e) => e instanceof HttpResponse))
        .subscribe(
          () => {
            this.uploading = false;
            this.fileList = [];
            this.msg.success('upload successfully.');
          },
          () => {
            this.uploading = false;
            this.msg.error('upload failed.');
          }
        );
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.isUploadImpty = false;
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**ui ux */
  validateform() {
    this.validateForm = this.fb.group({
      docTitle: ['', [Validators.required]],
      docOwner: ['', [Validators.required]],
      dateInDoc: ['', [Validators.required]],
      docsPlacesId: ['', [Validators.required]],
      docsTypeId: ['', [Validators.required]],
      comments: [''],
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
