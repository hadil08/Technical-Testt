import { TestBed } from '@angular/core/testing';

import { EventPartService } from './event-part.service';

describe('EventPartService', () => {
  let service: EventPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
