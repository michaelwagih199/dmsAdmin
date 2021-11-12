import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Subscription, interval, Observable } from 'rxjs';
import { FolderService } from '../../services/folders.service';
import { DepartmentsService } from '../../../admin-home/services/departments.service';
import { DeparmentModel } from 'src/app/admin-home/models/Department';
import { AddFolderComponent } from '../dialogs/add-folder/add-folder.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { FormControl } from '@angular/forms';
import { DocTypeComponent } from '../dialogs/doc-type/doc-type.component';
import { DocTypeModel } from '../../models/docTypeModel';
import { DocTypeService } from '../../services/doc-type.service';
import { AddDocsComponent } from '../dialogs/add-docs/add-docs.component';
import { DocDtoModel } from '../../models/docsDto';
import { DocsService } from '../../services/docs.service';
import { MoveDocComponent } from '../dialogs/move-doc/move-doc.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SearchComponent } from '../dialogs/search/search.component';
import { ImagesComponent } from '../dialogs/images/images.component';
import { BarcodeComponent } from '../dialogs/barcode/barcode.component';
import { DocsModel } from '../../models/docsModel';
import { LogsService } from 'src/app/shared/service/logs.service';
import { MultibleSearchComponent } from '../dialogs/multible-search/multible-search.component';

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
  // docsSets: DocsModel[] =[];
  public docsSets: Array<DocsModel> = [];

  department: DeparmentModel = new DeparmentModel();
  parentId: any;
  searchValue: any;
  docmentTypeSet!: DocTypeModel[];
  docmentTypeSelected: any;
  nodeId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private takenServive: TokenStorageService,
    private folderService: FolderService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private departmentService: DepartmentsService,
    private docTypeService: DocTypeService,
    private docsService: DocsService,
    private notification: NzNotificationService,
    private logs_service: LogsService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FolderStructure) =>
    !!node.children && node.children.length > 0;
  ngOnInit(): void {
    this.getPatientId();
    this.userName = sessionStorage.getItem('userName')?.toString();
    this.getAllDocTypeById();
  }

  /**data */
  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.departmentId = params['id'];
      this.findDepartmentById(params['id']);
      this.findFoldersByDepartmentId(params['id']);
    });
  }

  getAllDocTypeById() {
    this.isLoading = true;
    this.docTypeService.findByDepartment(this.departmentId).subscribe(
      (data) => {
        this.docmentTypeSet = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
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

  addDocType() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      departmentId: this.department.id,
    };
    this.dialog.open(DocTypeComponent, dialogConfig);
    const dialogRef = this.dialog.open(DocTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.getAllDocTypeById();
    });
  }

  sortList() {
    let list: DocsModel[] = this.docsSets;
    list.sort((a, b) => a.docTitle.localeCompare(b.docTitle));
    this.docsSets = [];

    list.forEach((doc) => {
      this.docsSets.push(doc);
    });
  }

  moveDoc(item: DocsModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      docId: item.id,
      departmentId: this.department.id,
    };
    this.dialog.open(MoveDocComponent, dialogConfig);
    const dialogRef = this.dialog.open(MoveDocComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.isLoading = true;
      this.docsService.moveDocComponent(data.parentId, item.id).subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Success',
            'Docment Moved succesfully'
          );
          this.isLoading = false;
          this.getAllDocTypeById();
          this.docsSets = [];
          this.dialog.closeAll();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    });
  }

  uploadFile() {
    console.log(this.parentId);
    if (this.breadcrumbList.length != 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        departmentId: this.department.id,
        breadcrumbList: this.breadcrumbList,
      };
      this.dialog.open(AddDocsComponent, dialogConfig);
      const dialogRef = this.dialog.open(AddDocsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        this.getAllDocTypeById();
        this.docsSets = [];
        this.dialog.closeAll();
      });
    } else {
      this.createNotification(
        'error',
        'Take care',
        'Please Select Folder To Upload'
      );
    }
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  nodeClick(node: FolderStructure) {
    this.clearBreadcrumbList();
    this.breadcrumbList.push(node);
    this.getParentDocs(node.id);
    this.nodeId = node.id;
  }

  getParentDocs(id: string) {
    this.isLoading = true;
    this.docsService.findByParent(id).subscribe(
      (docs) => {
        this.isLoading = false;
        this.docsSets = docs;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
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
      this.folderService.create(data.name, this.parentId).subscribe(
        (data) => {
          this.isLoading = false;
          this.getPatientId();
          this.dialog.closeAll();
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    });
  }

  viewImage(item: DocsModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(item);

    dialogConfig.data = item.fileName;
    this.dialog.open(ImagesComponent, dialogConfig);
    const dialogRef = this.dialog.open(ImagesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => { });
  }

  onFilterTypeChange(value: string) {
    if (value == null)
      this.getParentDocs(
        this.breadcrumbList[this.breadcrumbList.length - 1].id
      );
    else if (value != null) this.filterType(value);
  }

  filterType(value: string) {
    if (this.breadcrumbList.length == 0) {
      this.isLoading = false;
      this.createNotification('error', 'Take care', 'Please Select Folder ');
    } else {
      this.isLoading = true;
      this.docsService
        .filterByType(
          value,
          this.breadcrumbList[this.breadcrumbList.length - 1].id
        )
        .subscribe(
          (data) => {
            this.docsSets = data;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
    }
  }

  /**search */
  search() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      parentId: this.departmentId,
    };
    const dialogRef = this.dialog.open(SearchComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.isLoading = true;
        switch (data.searchFilter) {
          case 'code':
            this.docsService.findByDocCode(data.searchValue).subscribe(
              (data) => {
                this.isLoading = false;
                this.docsSets = data;
              },
              (err) => {
                this.isLoading = false;
                console.log(err);
              }
            );
            break;

          case 'title':
            this.docsService.findByDocTitle(data.searchValue).subscribe(
              (data) => {
                this.isLoading = false;
                this.docsSets = data;
              },
              (err) => {
                this.isLoading = false;
                console.log(err);
              }
            );
            break;

          case 'owner':
            this.docsService.findByDocOwner(data.searchValue).subscribe(
              (data) => {
                this.isLoading = false;
                this.docsSets = data;
              },
              (err) => {
                this.isLoading = false;
                console.log(err);
              }
            );
            break;

          case 'dates':
            this.docsService.findByDocDates(data.searchValue).subscribe(
              (data) => {
                this.isLoading = false;
                this.docsSets = data;
              },
              (err) => {
                this.isLoading = false;
                console.log(err);
              }
            );
            break;
          default:
            this.isLoading = false;
        }
      }


      this.dialog.closeAll();
    });
  }

  multibleSearch() {
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      // parentId: this.breadcrumbList[this.breadcrumbList.length - 1].id,
      parentId: this.departmentId,
    };
    const dialogRef = this.dialog.open(MultibleSearchComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.docsService.findByTitleAndOwner(data.title, data.owner).subscribe(
        (data) => {
          this.isLoading = false;
          this.docsSets = data;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );

    });
  }

  onBarcode(element: DocsModel) {
    // this.isLoading = true;
    const dialogRef = this.dialog.open(BarcodeComponent, {
      data: {
        model: element,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  deleteFolderDialog(element: FolderStructure) {
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
            this.logsEvent(`DeleteFolder : ${element.name}`);
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

  editeDocs(item: DocsModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      departmentId: this.department.id,
      breadcrumbList: this.breadcrumbList,
      model: item,
    };
    this.dialog.open(AddDocsComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddDocsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.getAllDocTypeById();
    });
  }

  deleteDoc(item: DocsModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${item.docTitle}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.docsService.delete(item.id).subscribe(
          (data) => {
            this.openSnackBar(`Docment Deleted Successfully`, '');
            this.docsSets = [];
            this.dialog.closeAll();
            this.getParentDocs(this.nodeId);
            this.logsEvent(`Delete Docment : ${item.docTitle}`);
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

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  logsEvent(message: string) {
    this.logs_service.create(message).subscribe();
  }
}
