import { TestBed } from '@angular/core/testing';

import { OurTeamService } from './our-team.service';

describe('OurTeamService', () => {
  let service: OurTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
