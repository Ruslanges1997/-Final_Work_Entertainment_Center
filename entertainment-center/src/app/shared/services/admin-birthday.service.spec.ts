import { TestBed } from '@angular/core/testing';

import { AdminBirthdayService } from './admin-birthday.service';

describe('AdminBirthdayService', () => {
  let service: AdminBirthdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBirthdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
