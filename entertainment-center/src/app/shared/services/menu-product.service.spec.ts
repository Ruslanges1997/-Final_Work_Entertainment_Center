import { TestBed } from '@angular/core/testing';

import { MenuProductService } from './menu-product.service';

describe('MenuProductService', () => {
  let service: MenuProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
