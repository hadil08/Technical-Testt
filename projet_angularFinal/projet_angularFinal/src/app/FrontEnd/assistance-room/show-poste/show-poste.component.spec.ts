import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPosteComponent } from './show-poste.component';

describe('ShowPosteComponent', () => {
  let component: ShowPosteComponent;
  let fixture: ComponentFixture<ShowPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
