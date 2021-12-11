import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeparmentModel } from 'src/app/admin-home/models/Department';
import { DepartmentsService } from 'src/app/admin-home/services/departments.service';
import { DocDtoModel } from 'src/app/department-admin/models/docsDto';
import { DocsService } from 'src/app/department-admin/services/docs.service';

@Component({
  selector: 'app-doc-codes',
  templateUrl: './doc-codes.component.html',
  styleUrls: ['./doc-codes.component.scss'],
})
export class DocCodesComponent implements OnInit {
  isLoading: boolean = false;
  docsSets!: DocDtoModel[];
  departmentSet!: DeparmentModel[];
  departmentSelected: any;
  constructor(
    private dialog: MatDialog,
    private departmentService: DepartmentsService,
    private notification: NzNotificationService,
    private docsService: DocsService
  ) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  /**data */
  getAllDepartments() {
    this.isLoading = true;
    this.departmentService.findAll().subscribe(
      (data) => {
        this.departmentSet = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  /**events */
  onFilterTypeChange(value: string) {
    console.log(value);

    if (value) {
      this.isLoading = true;
      this.docsService.findBydepartment(value).subscribe(
        (data) => {
          this.docsSets = data;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }



  
  /**uiux */
  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }
}


