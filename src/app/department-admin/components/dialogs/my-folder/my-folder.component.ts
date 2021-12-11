import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeparmentModel } from 'src/app/admin-home/models/Department';
import { DepartmentsService } from '../../../../admin-home/services/departments.service';

@Component({
  selector: 'app-my-folder',
  templateUrl: './my-folder.component.html',
  styleUrls: ['./my-folder.component.scss'],
})
export class MyFolderComponent implements OnInit {
  cards!: DeparmentModel[];
  userName = sessionStorage.getItem('userName');

  constructor(
    private dialogRef: MatDialogRef<MyFolderComponent>,
    private departmentService: DepartmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findMyDepartment();
  }

  /**data */
  findMyDepartment() {
    console.log(this.userName);

    this.departmentService.findMyDepartment(this.userName).subscribe(
      (data) => {
        this.cards = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * event
   */
  editDepartment(id: string) {
    this.reloadPage(`departmentAdmnin/${id}`);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  reloadPage(url: any) {
    this.router.navigateByUrl(`/${url}`);
  }
}
