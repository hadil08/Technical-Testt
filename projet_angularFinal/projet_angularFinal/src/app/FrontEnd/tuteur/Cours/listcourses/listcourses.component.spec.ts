import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursesComponent } from './listcourses.component';

describe('ListcoursesComponent', () => {
  let component: ListcoursesComponent;
  let fixture: ComponentFixture<ListcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
