import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts gg' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'app-navbar-department-admin',
  templateUrl: './navbar-department-admin.component.html',
  styleUrls: ['./navbar-department-admin.component.scss'],
})
export class NavbarDepartmentAdminComponent implements OnInit {
  departmentName = 'Administration';
  userName: any;
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor(
    private router: Router,
    private takenServive: TokenStorageService
  ) {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')?.toString();
  }

  logout() {
    this.takenServive.signOut();
    this.redirectTo('/');
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
