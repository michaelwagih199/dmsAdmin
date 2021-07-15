import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserModel } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  dataSet!: UserModel[];
  isLoading: boolean = false;
  isModalvisable: boolean = false;
  validateForm!: FormGroup;
  user: UserModel = new UserModel();
  selectedRolesValue: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validForms();
    this.getUsers();
  }

  /**data */
  getUsers() {
    this.isLoading = true;
    this.userService.findAll().subscribe(
      (users) => {
        this.dataSet = users;
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
          this.reloadPage();
        }
        this.isLoading = false;
      }
    );
  }
  /**
   * event
   */

  handleCentermodal() {
    this.isModalvisable = false;
  }

  submitUserForm() {
    this.isLoading = true;
    this.user.roles.push(this.selectedRolesValue);
    this.authService.create(this.user).subscribe(
      (post) => {
        this.isLoading = false;
        this.createNotification('success', 'Success', 'User Saved succesfully');
        this.getUsers();
        this.isModalvisable = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  showModal() {
    this.isModalvisable = true;
  }

  onDelete(item: UserModel) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this User?',
      nzContent: '<b style="color: red;">User Name : ' + item.username + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.isLoading = true;
        this.userService.delete(item.id).subscribe(
          (response) => {
            this.isLoading = false;
            this.createNotification(
              'success',
              'Success',
              'User Deleted succesfully'
            );
            this.getUsers();
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

  /**uiux */

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

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
      username: [null, [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      roles: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  reloadPage() {
    this.router.navigateByUrl('/admin');
  }
}
