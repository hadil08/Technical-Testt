import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceRoomComponent } from './assistance-room.component';

describe('AssistanceRoomComponent', () => {
  let component: AssistanceRoomComponent;
  let fixture: ComponentFixture<AssistanceRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistanceRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
