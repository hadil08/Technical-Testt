import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationsDialogComponentComponent } from './congratulations-dialog-component.component';

describe('CongratulationsDialogComponentComponent', () => {
  let component: CongratulationsDialogComponentComponent;
  let fixture: ComponentFixture<CongratulationsDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratulationsDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongratulationsDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
