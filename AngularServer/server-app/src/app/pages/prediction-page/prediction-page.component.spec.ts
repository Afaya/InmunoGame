import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { PredictionPageComponent } from "./prediction-page.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from "src/app/services/spinner.service";
import { ForecastService } from "src/app/services/forecast.service";
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeolocalizationService } from "src/app/services/geolocalization.service";
import { of, throwError } from "rxjs";

describe("PredictionPageComponent", () => {
  let component: PredictionPageComponent;
  let fixture: ComponentFixture<PredictionPageComponent>;
  const spinnerService: SpinnerService = new SpinnerService(
    new NgxSpinnerService()
  );
  const forecastService: ForecastService = new ForecastService(
    new HttpClient(null)
  );
  const geolocalizationService: GeolocalizationService =
    new GeolocalizationService(new HttpClient(null));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSpinnerModule, FormsModule, ReactiveFormsModule],
      declarations: [PredictionPageComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
        { provide: ForecastService, useValue: forecastService },
        { provide: SpinnerService, useValue: spinnerService },
        { provide: GeolocalizationService, useValue: geolocalizationService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display error if coordinates Service fails", () => {
    spyOn(geolocalizationService, "getCoordinates")
      .and.callThrough()
      .and.returnValue(throwError(new Error("Fake error")));

    component.showForecast();

    expect(component.isErrorDisplayed).toBeTruthy();
    expect(component.isForecastDisplayed).toBeFalsy();
  });

  it("should display error if forescast Service fails", () => {
    spyOn(geolocalizationService, "getCoordinates")
      .and.callThrough()
      .and.returnValue(
        of([
          {
            place_id: 288211184,
            licence: "mock",
            powered_by: "mock",
            osm_type: "mock",
            osm_id: 288211184,
            boundingbox: ["mock"],
            lat: "mock",
            lon: "mock",
            display_name: "mock",
            class: "mock",
            type: "mock",
            importance: 288211184,
          },
        ])
      );

    spyOn(forecastService, "getforecast")
      .and.callThrough()
      .and.returnValue(throwError(new Error("Fake error")));
    component.showForecast();

    expect(component.isErrorDisplayed).toBeTruthy();
    expect(component.isForecastDisplayed).toBeFalsy();
  });

  it("should display error if forescast Service fails", () => {
    spyOn(geolocalizationService, "getCoordinates")
      .and.callThrough()
      .and.returnValue(
        of([
          {
            place_id: 288211184,
            licence: "mock",
            powered_by: "mock",
            osm_type: "mock",
            osm_id: 288211184,
            boundingbox: ["mock"],
            lat: "mock",
            lon: "mock",
            display_name: "mock",
            class: "mock",
            type: "mock",
            importance: 288211184,
          },
        ])
      );

    spyOn(forecastService, "getforecast")
      .and.callThrough()
      .and.returnValue(
        of({
          latitude: 15,
          longitude: 15,
          generationtime_ms: 15,
          utc_offset_seconds: 15,
          timezone: "mock",
          timezone_abbreviation: "mock",
          elevation: 15,
          current_weather: {
            temperature: 15,
            windspeed: 15,
            winddirection: 15,
            weathercode: 15,
            is_day: 15,
            time: new Date(),
          },
          hourly_units: {
            time: [],
            temperature_2m: [],
            relativehumidity_2m: [],
          },
          hourly: {
            time: [],
            temperature_2m: [],
            relativehumidity_2m: [],
          },
        })
      );

    component.showForecast();

    expect(component.isErrorDisplayed).toBeFalsy();
    expect(component.isForecastDisplayed).toBeTruthy();
  });
});
