import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionDataComponent } from './evolution-data.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DataReadService } from 'src/app/services/data-read.service';
import { Router } from '@angular/router';

describe('EvolutionDataComponent', () => {
  let component: EvolutionDataComponent;
  let fixture: ComponentFixture<EvolutionDataComponent>;
  const spinnerService: SpinnerService = new SpinnerService(new NgxSpinnerService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSpinnerModule],
      declarations: [ EvolutionDataComponent ],
      providers: [
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        {provide: DataReadService, useValue: dataReadService},
        {provide: SpinnerService, useValue: spinnerService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
