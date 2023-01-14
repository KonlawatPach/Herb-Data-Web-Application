import { TestBed } from '@angular/core/testing';

import { HerbSessionService } from './herb-session.service';

describe('HerbSessionService', () => {
  let service: HerbSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerbSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
