import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPremiumComponent } from './calculator-premium.component';

describe('CalculatorPremiumComponent', () => {
  let component: CalculatorPremiumComponent;
  let fixture: ComponentFixture<CalculatorPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
