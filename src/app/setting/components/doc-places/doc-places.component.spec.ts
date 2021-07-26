import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPlacesComponent } from './doc-places.component';

describe('DocPlacesComponent', () => {
  let component: DocPlacesComponent;
  let fixture: ComponentFixture<DocPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
