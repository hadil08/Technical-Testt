import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesoffersComponent } from './mesoffers.component';

describe('MesoffersComponent', () => {
  let component: MesoffersComponent;
  let fixture: ComponentFixture<MesoffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesoffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
