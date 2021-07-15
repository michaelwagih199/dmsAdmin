import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCodesComponent } from './doc-codes.component';

describe('DocCodesComponent', () => {
  let component: DocCodesComponent;
  let fixture: ComponentFixture<DocCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
