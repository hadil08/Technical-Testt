import { TestBed } from '@angular/core/testing';

import { EventstatService } from './eventstat.service';

describe('EventstatService', () => {
  let service: EventstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
