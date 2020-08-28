import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBirthdayComponent } from './order-birthday.component';

describe('OrderBirthdayComponent', () => {
  let component: OrderBirthdayComponent;
  let fixture: ComponentFixture<OrderBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
