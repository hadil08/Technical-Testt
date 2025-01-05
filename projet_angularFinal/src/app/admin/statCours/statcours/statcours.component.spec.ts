import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatcoursComponent } from './statcours.component';

describe('StatcoursComponent', () => {
  let component: StatcoursComponent;
  let fixture: ComponentFixture<StatcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
