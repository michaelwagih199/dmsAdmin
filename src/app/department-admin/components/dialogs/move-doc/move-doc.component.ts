import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FolderService } from 'src/app/department-admin/services/folders.service';

interface FolderStructure {
  id: string;
  name: any;
  children?: FolderStructure[];
}

let TREE_DATA: FolderStructure[] = [];

@Component({
  selector: 'app-move-doc',
  templateUrl: './move-doc.component.html',
  styleUrls: ['./move-doc.component.scss'],
})
export class MoveDocComponent implements OnInit {
  docId: string;
  treeControl = new NestedTreeControl<FolderStructure>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FolderStructure>();
  departmentId: any;
  parentId: any;
  parentName:any;

  constructor(
    private dialogRef: MatDialogRef<MoveDocComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private folderService: FolderService
  ) {
    this.docId = data.docId;
    this.departmentId = data.departmentId;
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FolderStructure) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.findFoldersByDepartmentId();
  }

  findFoldersByDepartmentId() {
    this.folderService.findTreeAll(this.departmentId).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.parentId = data[0].id;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  nodeClick(node: FolderStructure) {
    console.log(node);
    this.parentId = node.id;
    this.parentName = node.name;
  }

  close() {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    let data = {
      parentId: this.parentId,
    };
    this.dialogRef.close(data);
  }
  
}
