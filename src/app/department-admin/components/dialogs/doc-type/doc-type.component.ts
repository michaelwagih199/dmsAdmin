import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DocTypeModel } from 'src/app/department-admin/models/docTypeModel';
import { DocTypeService } from 'src/app/department-admin/services/doc-type.service';

@Component({
  selector: 'app-doc-type',
  templateUrl: './doc-type.component.html',
  styleUrls: ['./doc-type.component.scss'],
})

export class DocTypeComponent implements OnInit {
  dataSet!: DocTypeModel[];
  isLoading: boolean = false;
  departmentId: any;
  description: any;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DocTypeComponent>,
    private docTypeService: DocTypeService,
    private notification: NzNotificationService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.departmentId = data.departmentId;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.description, [Validators.required]],
    });
    this.getAllDocTypeById();
  }

  /*****
   * data
   */

  getAllDocTypeById() {
    this.isLoading = true;
    this.docTypeService.findByDepartment(this.departmentId).subscribe(
      (data) => {
        this.dataSet = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  /******
   * event
   */

  save(): void {
    this.isLoading = true;
    let dataModel: DocTypeModel = new DocTypeModel();
    dataModel.type = this.description;
    this.docTypeService.create(dataModel, this.departmentId).subscribe(
      (data) => {
        this.isLoading = false;
        this.getAllDocTypeById();
        this.createNotification(
          'success',
          'Success',
          'Department Type Saved succesfully'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDelete(item: DocTypeModel) {
    this.isLoading = true;
    this.docTypeService.delete(item.id).subscribe(
      (data) => {
        this.isLoading = false;
        this.getAllDocTypeById();
        this.createNotification(
          'success',
          'Success',
          'Department Type Deleted succesfully'
        );
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  
  close() {
    this.dialogRef.close();
  }
  /**uiux */

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

}
