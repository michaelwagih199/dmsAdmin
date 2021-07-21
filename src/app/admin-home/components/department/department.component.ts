import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentsService } from '../../services/departments.service';
import { UserModel } from 'src/app/setting/models/user';
import { UserServiceService } from 'src/app/setting/services/user-service.service';
import { DeparmentModel } from '../../models/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  dataSet!: DeparmentModel[];
  isLoading: boolean = false;
  isModalvisable: boolean = false;
  validateForm!: FormGroup;
  userSet!: UserModel[];
  department: DeparmentModel = new DeparmentModel();

  selecteUser!: string;
  saveDepartmentCheck = 'Save';
  departmentNameBind: any;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentsService,
    private notification: NzNotificationService,
    private userService: UserServiceService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDepartments();
    this.getUsers();
    this.validForms();
  }

  /**data */
  getAllDepartments() {
    this.isLoading = true;
    this.departmentService.findAll().subscribe(
      (data) => {
        this.dataSet = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        if (err.statusText == 'Forbidden') {
          this.createNotification(
            'error',
            'error',
            'You cant access this page'
          );
          this.reloadPage('admin');
        }
        this.isLoading = false;
      }
    );
  }

  getUsers() {
    this.isLoading = true;
    this.userService.findAll().subscribe(
      (users) => {
        this.userSet = users;
        this.isLoading = false;
      },
      (err) => {
        console.log(err.error.error);
        if (err.error.error == 'Forbidden') {
          this.createNotification(
            'error',
            'error',
            'You cant access this page'
          );
          this.reloadPage('admin');
        }
        this.isLoading = false;
      }
    );
  }

  /**events */
  onDelete(item: DeparmentModel) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Department?',
      nzContent:
        '<b style="color: red;">Department : ' + item.departmentName + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.isLoading = true;
        this.departmentService.delete(item.id).subscribe(
          (response) => {
            this.isLoading = false;
            this.createNotification(
              'success',
              'Success',
              'Department Deleted succesfully'
            );
            this.getAllDepartments();
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  onOptionsSelected(deviceValue: any) {
    console.log(deviceValue);
  }

  submitForm() {
    if (this.saveDepartmentCheck == 'Save') {
      this.isLoading = true;
      this.department.user = this.selecteUser;
      this.departmentService.create(this.department).subscribe(
        (response) => {
          this.createNotification(
            'success',
            'Success',
            'Department Saved succesfully'
          );
          this.getAllDepartments();
          this.isLoading = false;
          this.isModalvisable = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  validForms() {
    this.validateForm = this.fb.group({
      departmentName: [null, [Validators.required]],
      user: [null, [Validators.required]],
    });
  }

  showModal() {
    this.isModalvisable = true;
  }

  toDepartmentAdmin(data: DeparmentModel) {
    this.reloadPage(`departmentAdmnin/${data.id}`);
  }

  handleCentermodal() {
    this.isModalvisable = false;
  }

  /**uiux */
  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  reloadPage(url: any) {
    this.router.navigateByUrl(`/${url}`);
  }
}
