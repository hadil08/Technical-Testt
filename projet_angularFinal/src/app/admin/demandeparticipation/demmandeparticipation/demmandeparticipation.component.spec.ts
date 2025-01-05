import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemmandeparticipationComponent } from './demmandeparticipation.component';

describe('DemmandeparticipationComponent', () => {
  let component: DemmandeparticipationComponent;
  let fixture: ComponentFixture<DemmandeparticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemmandeparticipationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemmandeparticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
