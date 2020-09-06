import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorBirhdayComponent } from './calculator-birhday.component';

describe('CalculatorBirhdayComponent', () => {
  let component: CalculatorBirhdayComponent;
  let fixture: ComponentFixture<CalculatorBirhdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorBirhdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorBirhdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
