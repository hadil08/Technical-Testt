import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPartComponent } from './event-part.component';

describe('EventPartComponent', () => {
  let component: EventPartComponent;
  let fixture: ComponentFixture<EventPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
