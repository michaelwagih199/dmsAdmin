import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDepartmentAdminComponent } from './navbar-department-admin.component';

describe('NavbarDepartmentAdminComponent', () => {
  let component: NavbarDepartmentAdminComponent;
  let fixture: ComponentFixture<NavbarDepartmentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDepartmentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDepartmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
