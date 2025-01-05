import { TestBed } from '@angular/core/testing';

import { TentativeService } from './tentative.service';

describe('TentativeService', () => {
  let service: TentativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TentativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
