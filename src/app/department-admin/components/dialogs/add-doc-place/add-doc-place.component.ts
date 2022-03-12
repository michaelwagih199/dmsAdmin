import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DocTypeModel } from 'src/app/department-admin/models/docTypeModel';
import { DocTypeService } from 'src/app/department-admin/services/doc-type.service';
import { CodePlacesModel } from 'src/app/setting/models/docPlaces';
import { DocPlacesService } from 'src/app/setting/services/doc-places.service';
import { DocTypeComponent } from '../doc-type/doc-type.component';

@Component({
  selector: 'app-add-doc-place',
  templateUrl: './add-doc-place.component.html',
  styleUrls: ['./add-doc-place.component.scss']
})
export class AddDocPlaceComponent implements OnInit {

  dataSet!: CodePlacesModel[];
  isLoading: boolean = false;
  departmentId: any;
  description: any;
  departmnetName!:string;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DocTypeComponent>,
    private docPlaceService: DocPlacesService,
    private notification: NzNotificationService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.departmentId = data.departmentId;
    this.departmnetName = data.departmnetName;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.description, [Validators.required]],
    });
    this.getAllDocPlaceById();
  }

  /*****
   * data
   */

  getAllDocPlaceById() {
    this.isLoading = true;
    this.docPlaceService.findByDepartmentId(this.departmentId).subscribe(
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
    let dataModel: CodePlacesModel = new CodePlacesModel();
    dataModel.codePlace = this.description;
    this.docPlaceService.create(dataModel, this.departmentId).subscribe(
      (data) => {
        this.isLoading = false;
        this.getAllDocPlaceById();
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

  onDelete(item: CodePlacesModel) {
    this.isLoading = true;
    this.docPlaceService.delete(item.id).subscribe(
      (data) => {
        this.isLoading = false;
        this.getAllDocPlaceById();
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
