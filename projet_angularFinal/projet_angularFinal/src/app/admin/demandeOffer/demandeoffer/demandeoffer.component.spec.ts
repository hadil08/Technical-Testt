import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeofferComponent } from './demandeoffer.component';

describe('DemandeofferComponent', () => {
  let component: DemandeofferComponent;
  let fixture: ComponentFixture<DemandeofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
