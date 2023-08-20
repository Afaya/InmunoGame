import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionPageComponent } from './prediction-page.component';

describe('PredictionPageComponent', () => {
  let component: PredictionPageComponent;
  let fixture: ComponentFixture<PredictionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
