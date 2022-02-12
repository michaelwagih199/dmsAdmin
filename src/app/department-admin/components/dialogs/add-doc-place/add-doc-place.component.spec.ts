import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocPlaceComponent } from './add-doc-place.component';

describe('AddDocPlaceComponent', () => {
  let component: AddDocPlaceComponent;
  let fixture: ComponentFixture<AddDocPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
