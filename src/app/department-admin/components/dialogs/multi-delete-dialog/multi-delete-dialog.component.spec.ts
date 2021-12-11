import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDeleteDialogComponent } from './multi-delete-dialog.component';

describe('MultiDeleteDialogComponent', () => {
  let component: MultiDeleteDialogComponent;
  let fixture: ComponentFixture<MultiDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
