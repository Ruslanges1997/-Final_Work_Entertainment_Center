import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntertainmentComponent } from './admin-entertainment.component';

describe('AdminEntertainmentComponent', () => {
  let component: AdminEntertainmentComponent;
  let fixture: ComponentFixture<AdminEntertainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEntertainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
