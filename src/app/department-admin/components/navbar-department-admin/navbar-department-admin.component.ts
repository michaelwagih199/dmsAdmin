import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Subscription, interval } from 'rxjs';
import { FolderService } from '../../services/folders.service';
import { DepartmentsService } from '../../../admin-home/services/departments.service';
import { DeparmentModel } from 'src/app/admin-home/models/Department';
import { AddFolderComponent } from '../dialogs/add-folder/add-folder.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */

interface FolderStructure {
  id: string;
  name: any;
  children?: FolderStructure[];
}

let TREE_DATA: FolderStructure[] = [];

@Component({
  selector: 'app-navbar-department-admin',
  templateUrl: './navbar-department-admin.component.html',
  styleUrls: ['./navbar-department-admin.component.scss'],
})
export class NavbarDepartmentAdminComponent implements OnInit {
  userName: any;
  treeControl = new NestedTreeControl<FolderStructure>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FolderStructure>();
  departmentId: any;
  private routeSub!: Subscription;
  isLoading: boolean = false;
  breadcrumbList: FolderStructure[] = [];
  dataSet: any;
  department: DeparmentModel = new DeparmentModel();
  parentId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private takenServive: TokenStorageService,
    private folderService: FolderService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private departmentService: DepartmentsService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FolderStructure) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.getPatientId();
    this.userName = sessionStorage.getItem('userName')?.toString();
  }

  /**data */
  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.departmentId = params['id'];
      this.findDepartmentById(params['id']);
      this.findFoldersByDepartmentId(params['id']);
    });
  }

  findFoldersByDepartmentId(departmentId: any) {
    this.folderService.findTreeAll(departmentId).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.parentId = data[0].id;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findDepartmentById(arg0: any) {
    this.isLoading = true;
    this.departmentService.findById(arg0).subscribe(
      (data) => {
        this.isLoading = false;
        this.department = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**event */
  logout() {
    this.takenServive.signOut();
    this.redirectTo('/');
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  nodeClick(node: FolderStructure) {
    this.clearBreadcrumbList();
    this.breadcrumbList.push(node);
  }

  createFolder() {
    let folderName: any;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      folderName: folderName,
    };
    this.dialog.open(AddFolderComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddFolderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.isLoading = true;
      this.folderService.create(data.name, this.parentId).subscribe((data) => {
        this.isLoading = false;
        this.getPatientId();
        this.dialog.closeAll();
      });
    });
  }

  deleteDialog(element: FolderStructure) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.name}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.folderService.delete(element.id, this.parentId).subscribe(
          (data) => {
            this.openSnackBar(`Folder Deleted Successfully`, '');
            this.getPatientId();
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

  toHome() {
    this.redirectTo('admin');
  }

  /**uiux */
  clearBreadcrumbList() {
    this.breadcrumbList = [];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
