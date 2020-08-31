import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuProductComponent } from './admin-menu-product.component';

describe('AdminMenuProductComponent', () => {
  let component: AdminMenuProductComponent;
  let fixture: ComponentFixture<AdminMenuProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenuProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
