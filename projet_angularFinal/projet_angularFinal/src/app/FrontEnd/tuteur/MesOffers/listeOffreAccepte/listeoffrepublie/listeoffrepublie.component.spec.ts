import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoffrepublieComponent } from './listeoffrepublie.component';

describe('ListeoffrepublieComponent', () => {
  let component: ListeoffrepublieComponent;
  let fixture: ComponentFixture<ListeoffrepublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeoffrepublieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeoffrepublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
