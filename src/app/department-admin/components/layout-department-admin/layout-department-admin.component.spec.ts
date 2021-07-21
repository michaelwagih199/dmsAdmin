import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDepartmentAdminComponent } from './layout-department-admin.component';

describe('LayoutDepartmentAdminComponent', () => {
  let component: LayoutDepartmentAdminComponent;
  let fixture: ComponentFixture<LayoutDepartmentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDepartmentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDepartmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
