import { TestBed } from '@angular/core/testing';

import { ParticipationServiceService } from './participation-service.service';

describe('ParticipationServiceService', () => {
  let service: ParticipationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
