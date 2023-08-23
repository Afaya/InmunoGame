import { TestBed } from "@angular/core/testing";
import { GeolocalizationService } from "./geolocalization.service";
import { HttpClientModule } from "@angular/common/http";

describe("GeolocalizationService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GeolocalizationService],
    })
  );

  it("should be created", () => {
    const service: GeolocalizationService = TestBed.get(GeolocalizationService);
    expect(service).toBeTruthy();
  });

  it("coordinates should be returned", () => {
    const service: GeolocalizationService = TestBed.get(GeolocalizationService);
    service
      .getCoordinates("El entrego")
      .subscribe((result) => expect(result.length).toBeGreaterThan(0));
    service
      .getCoordinates("El entrego")
      .subscribe((result) => expect(result[0].lat).toBe("43.28726995"));
  });
});
