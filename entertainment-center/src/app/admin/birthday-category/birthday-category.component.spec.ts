import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayCategoryComponent } from './birthday-category.component';

describe('BirthdayCategoryComponent', () => {
  let component: BirthdayCategoryComponent;
  let fixture: ComponentFixture<BirthdayCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
