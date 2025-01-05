import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostesBackendComponent } from './postes-backend.component';

describe('PostesBackendComponent', () => {
  let component: PostesBackendComponent;
  let fixture: ComponentFixture<PostesBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostesBackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostesBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
