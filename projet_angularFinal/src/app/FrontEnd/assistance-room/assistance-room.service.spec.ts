import { TestBed } from '@angular/core/testing';

import { AssistanceRoomService } from './assistance-room.service';

describe('AssistanceRoomService', () => {
  let service: AssistanceRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistanceRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
