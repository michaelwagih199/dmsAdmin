import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDocComponent } from './move-doc.component';

describe('MoveDocComponent', () => {
  let component: MoveDocComponent;
  let fixture: ComponentFixture<MoveDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
