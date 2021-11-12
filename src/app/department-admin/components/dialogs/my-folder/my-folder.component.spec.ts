import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFolderComponent } from './my-folder.component';

describe('MyFolderComponent', () => {
  let component: MyFolderComponent;
  let fixture: ComponentFixture<MyFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
