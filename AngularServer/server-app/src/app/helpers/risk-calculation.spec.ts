import { async, TestBed } from "@angular/core/testing";
import {
  calculateInfluenzaRatius,
  calculateParticlesRisk,
} from "./risk-calculation";

describe("RiskCalculationHelper", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [],
    }).compileComponents();
  }));

  it("should return extra high influenza risk", () => {
    const influenzaReceivedData = {
      temp: 4,
      hum: 10,
    };

    const influenzaRisk = calculateInfluenzaRatius(
      influenzaReceivedData.temp,
      influenzaReceivedData.hum
    );
    const expectedResponse = "Muy Alta";
    expect(influenzaRisk.title).toBe(expectedResponse);
  });

  it("should return high influenza risk", () => {
    const influenzaReceivedData = {
      temp: 4,
      hum: 20,
    };

    const influenzaRisk = calculateInfluenzaRatius(
      influenzaReceivedData.temp,
      influenzaReceivedData.hum
    );
    const expectedResponse = "Alta";
    expect(influenzaRisk.title).toBe(expectedResponse);
  });

  it("should return medium influenza risk", () => {
    const influenzaReceivedData = {
      temp: 9,
      hum: 29,
    };

    const influenzaRisk = calculateInfluenzaRatius(
      influenzaReceivedData.temp,
      influenzaReceivedData.hum
    );
    const expectedResponse = "Media";
    expect(influenzaRisk.title).toBe(expectedResponse);
  });

  it("should return medium influenza risk", () => {
    const influenzaReceivedData = {
      temp: 15,
      hum: 29,
    };

    const influenzaRisk = calculateInfluenzaRatius(
      influenzaReceivedData.temp,
      influenzaReceivedData.hum
    );
    const expectedResponse = "Baja";
    expect(influenzaRisk.title).toBe(expectedResponse);
  });

  it("should return high allergy risk", () => {
    const particlesReceivedData = {
      pm25: 151,
      pm100: 151,
    };

    const allergyRisk = calculateParticlesRisk(
      particlesReceivedData.pm25,
      particlesReceivedData.pm100
    );
    const expectedResponse = "Muy Alta";
    expect(allergyRisk.title).toBe(expectedResponse);
  });

  it("should return high allergy risk", () => {
    const particlesReceivedData = {
      pm25: 151,
      pm100: 99,
    };

    const allergyRisk = calculateParticlesRisk(
      particlesReceivedData.pm25,
      particlesReceivedData.pm100
    );
    const expectedResponse = "Alta";
    expect(allergyRisk.title).toBe(expectedResponse);
  });

  it("should return medium allergy risk", () => {
    const particlesReceivedData = {
      pm25: 49,
      pm100: 51,
    };

    const allergyRisk = calculateParticlesRisk(
      particlesReceivedData.pm25,
      particlesReceivedData.pm100
    );
    const expectedResponse = "Media";
    expect(allergyRisk.title).toBe(expectedResponse);
  });

  it("should return low allergy risk", () => {
    const particlesReceivedData = {
      pm25: 49,
      pm100: 49,
    };

    const allergyRisk = calculateParticlesRisk(
      particlesReceivedData.pm25,
      particlesReceivedData.pm100
    );
    const expectedResponse = "Baja";
    expect(allergyRisk.title).toBe(expectedResponse);
  });
});
