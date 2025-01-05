import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARbackendComponent } from './arbackend.component';

describe('ARbackendComponent', () => {
  let component: ARbackendComponent;
  let fixture: ComponentFixture<ARbackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ARbackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ARbackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
