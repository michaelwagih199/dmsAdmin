import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { MyFolderComponent } from 'src/app/department-admin/components/dialogs/my-folder/my-folder.component';
import { AboutAppDialogComponent } from '../dialog/about-app-dialog/about-app-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userName: any;

  DynamicNavBar = {
    department: true,
    setting: true,
    myDepartment: true,
  };

  opened = true;

  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;
  screenTitle: any = 'DMS Application';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private takenServive: TokenStorageService
  ) {}

  ngOnInit() {
    let userPermission = sessionStorage.getItem('user-roles');
    this.userName = sessionStorage.getItem('userName')?.toString();

    if (userPermission?.includes('mod')) {
      this.DynamicNavBar.department = false;
      this.DynamicNavBar.setting = false;
      this.DynamicNavBar.myDepartment = true;
    } else {
      this.DynamicNavBar.department = true;
      this.DynamicNavBar.department = true;
      this.DynamicNavBar.myDepartment = false;
    }

    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  onItemClick() {}

  logoutComfirm() {
    this.logout();
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  aboutApp() {
    const dialogRef = this.dialog.open(AboutAppDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addTitle(title: any) {
    this.screenTitle = title;
  }

  myFolder(title: any) {
    this.screenTitle = title;
    const dialogRef = this.dialog.open(MyFolderComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
