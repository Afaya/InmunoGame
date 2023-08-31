import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SensorHomeComponent } from "./sensor-home.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { DataReadService } from "src/app/services/data-read.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";

describe("SensorHomeComponent", () => {
  let component: SensorHomeComponent;
  let fixture: ComponentFixture<SensorHomeComponent>;
  const spinnerService: SpinnerService = new SpinnerService(
    new NgxSpinnerService()
  );
  const dataReadService: DataReadService = new DataReadService(
    new HttpClient(null)
  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSpinnerModule],
      declarations: [SensorHomeComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
        { provide: DataReadService, useValue: dataReadService },
        { provide: SpinnerService, useValue: spinnerService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display error text when fails", () => {
    spyOn(dataReadService, "getDHT")
      .and.callThrough()
      .and.returnValue(throwError(new Error("Fake error")));
    spyOn(dataReadService, "getSDS011")
      .and.callThrough()
      .and.returnValue(throwError(new Error("Fake error")));

    component.readData();

    expect(component.isErrorDisplayed).toBeTruthy();
  });

  it("should not display error when services not fail", () => {
    spyOn(dataReadService, "getDHT")
      .and.callThrough()
      .and.returnValue(
        of({
          temp: 37.5,
          hum: 3,
        })
      );
    spyOn(dataReadService, "getSDS011")
      .and.callThrough()
      .and.returnValue(
        of({
          pm25: 10,
          pm100: 5,
        })
      );
    component.readData();

    expect(component.isErrorDisplayed).toBeFalsy();
  });
});
