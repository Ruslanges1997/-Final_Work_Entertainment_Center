import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorStandartComponent } from './calculator-standart.component';

describe('CalculatorStandartComponent', () => {
  let component: CalculatorStandartComponent;
  let fixture: ComponentFixture<CalculatorStandartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorStandartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorStandartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
