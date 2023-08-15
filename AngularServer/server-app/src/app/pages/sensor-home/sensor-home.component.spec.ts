import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SensorHomeComponent } from "./sensor-home.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { DataReadService } from "src/app/services/data-read.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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

  it("should return extra high influenza risk", () => {
    const influenzaReceivedData = {
      temp: 4,
      hum: 10,
    };

    component.calculateInfluenzaRatius(influenzaReceivedData);
    const expectedResponse = "Muy Alta";
    expect(component.influenzaRisk).toBe(expectedResponse);
  });

  it("should return high influenza risk", () => {
    const influenzaReceivedData = {
      temp: 4,
      hum: 20,
    };

    component.calculateInfluenzaRatius(influenzaReceivedData);
    const expectedResponse = "Alta";
    expect(component.influenzaRisk).toBe(expectedResponse);
  });

  it("should return medium influenza risk", () => {
    const influenzaReceivedData = {
      temp: 9,
      hum: 29,
    };

    component.calculateInfluenzaRatius(influenzaReceivedData);
    const expectedResponse = "Media";
    expect(component.influenzaRisk).toBe(expectedResponse);
  });

  it("should return medium influenza risk", () => {
    const influenzaReceivedData = {
      temp: 15,
      hum: 29,
    };

    component.calculateInfluenzaRatius(influenzaReceivedData);
    const expectedResponse = "Baja";
    expect(component.influenzaRisk).toBe(expectedResponse);
  });

  it("should return high allergy risk", () => {
    const particlesReceivedData = {
      pm25: 151,
      pm100: 151,
    };

    component.calculateParticlesRisk(particlesReceivedData);
    const expectedResponse = "Muy Alta";
    expect(component.particlesRisk).toBe(expectedResponse);
  });

  it("should return high allergy risk", () => {
    const particlesReceivedData = {
      pm25: 151,
      pm100: 99,
    };

    component.calculateParticlesRisk(particlesReceivedData);
    const expectedResponse = "Alta";
    expect(component.particlesRisk).toBe(expectedResponse);
  });

  it("should return medium allergy risk", () => {
    const particlesReceivedData = {
      pm25: 49,
      pm100: 51,
    };

    component.calculateParticlesRisk(particlesReceivedData);
    const expectedResponse = "Media";
    expect(component.particlesRisk).toBe(expectedResponse);
  });

  it("should return low influenza risk", () => {
    const particlesReceivedData = {
      pm25: 49,
      pm100: 49,
    };

    component.calculateParticlesRisk(particlesReceivedData);
    const expectedResponse = "Baja";
    expect(component.particlesRisk).toBe(expectedResponse);
  });

  it("should display error text when fails", () => {
    component.isErrorDisplayed = true;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("span").textContent).toContain(
      "Error al recibir los datos, volveremos a probar en unos segundos"
    );
  });
});
