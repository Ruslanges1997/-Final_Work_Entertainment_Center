import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryMenuComponent } from './admin-category-menu.component';

describe('AdminCategoryMenuComponent', () => {
  let component: AdminCategoryMenuComponent;
  let fixture: ComponentFixture<AdminCategoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
