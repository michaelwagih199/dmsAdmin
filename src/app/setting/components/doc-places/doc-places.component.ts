import { Component, OnInit } from '@angular/core';
import { CodePlacesModel } from '../../models/docPlaces';
import { DocPlacesService } from '../../services/doc-places.service';
import { DepartmentsService } from '../../../admin-home/services/departments.service';
import { DeparmentModel } from '../../../admin-home/models/Department';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doc-places',
  templateUrl: './doc-places.component.html',
  styleUrls: ['./doc-places.component.scss'],
})
export class DocPlacesComponent implements OnInit {
  isLoading: boolean = false;
  isModalvisable: boolean = false;
  dataSet!: CodePlacesModel[];
  departmentSet!: DeparmentModel[];
  selectedDepartment!: string;
  saveCodeCheck = 'Save';
  codePlace: CodePlacesModel = new CodePlacesModel();
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private docPlacesService: DocPlacesService,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.validForms();
    this.getAllDOcPlaces();
    this.getAllDepartments();
  }

  /**
   * data
   */

  getAllDOcPlaces() {
    this.isLoading = true;
    this.docPlacesService.findAll().subscribe(
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

  getAllDepartments() {
    this.isLoading = true;
    this.departmentService.findAll().subscribe(
      (data) => {
        this.isLoading = false;
        this.departmentSet = data;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  /**event */
  onDelete(element: CodePlacesModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.codePlace}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.docPlacesService.delete(element.id).subscribe(
          (data) => {
            this.openSnackBar(`Deleted Successfully`, '');
            this.getAllDOcPlaces();
            this.dialog.closeAll();
          },
          (error) => console.log(error)
        );
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
    
  }

  
  onEdite(item: CodePlacesModel) {
    this.codePlace = item;
    this.isModalvisable = true;
    this.saveCodeCheck = 'Update';
  }

  showModal() {
    this.codePlace = new CodePlacesModel();
    this.saveCodeCheck = 'Save';
    this.isModalvisable = true;
  }

  handleCentermodal() {
    this.isModalvisable = false;
  }

  submitForm() {
    if (this.saveCodeCheck == 'Save') {
      this.isLoading = true;
      this.docPlacesService
        .create(this.codePlace, this.selectedDepartment)
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.getAllDOcPlaces();
            this.isModalvisable = false;
            this.createNotification(
              'success',
              'Success',
              'Code Saved succesfully'
            );
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          }
        );
    }else{
      this.isLoading = true;
      this.docPlacesService
        .update(this.codePlace,this.codePlace.id, this.selectedDepartment)
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.getAllDOcPlaces();
            this.isModalvisable = false;
            this.createNotification(
              'success',
              'Success',
              'Code Updated succesfully'
            );
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          }
        );
    }
  }

  /********************************uiux */

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validForms() {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

}
