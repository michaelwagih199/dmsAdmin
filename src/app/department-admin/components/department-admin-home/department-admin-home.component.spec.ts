import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAdminHomeComponent } from './department-admin-home.component';

describe('DepartmentAdminHomeComponent', () => {
  let component: DepartmentAdminHomeComponent;
  let fixture: ComponentFixture<DepartmentAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAdminHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
