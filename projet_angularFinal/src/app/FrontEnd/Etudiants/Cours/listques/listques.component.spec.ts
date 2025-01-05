import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListquesComponent } from './listques.component';

describe('ListquesComponent', () => {
  let component: ListquesComponent;
  let fixture: ComponentFixture<ListquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
