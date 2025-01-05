import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudcourComponent } from './etudcour.component';

describe('EtudcourComponent', () => {
  let component: EtudcourComponent;
  let fixture: ComponentFixture<EtudcourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudcourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
