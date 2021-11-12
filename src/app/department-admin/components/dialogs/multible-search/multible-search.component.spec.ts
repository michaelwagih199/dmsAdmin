import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibleSearchComponent } from './multible-search.component';

describe('MultibleSearchComponent', () => {
  let component: MultibleSearchComponent;
  let fixture: ComponentFixture<MultibleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultibleSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultibleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
