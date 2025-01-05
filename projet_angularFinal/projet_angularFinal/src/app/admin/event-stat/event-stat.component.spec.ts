import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStatComponent } from './event-stat.component';

describe('EventStatComponent', () => {
  let component: EventStatComponent;
  let fixture: ComponentFixture<EventStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
