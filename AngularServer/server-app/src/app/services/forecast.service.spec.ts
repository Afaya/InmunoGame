import { TestBed } from "@angular/core/testing";
import { ForecastService } from "./forecast.service";
import { HttpClientModule } from "@angular/common/http";

describe("ForecastService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ForecastService],
    })
  );

  it("should be created", () => {
    const service: ForecastService = TestBed.get(ForecastService);
    expect(service).toBeTruthy();
  });

  it("forecast should be returned", () => {
    const service: ForecastService = TestBed.get(ForecastService);
    service
      .getforecast(43.3604218, -5.8450534)
      .subscribe((result) =>
        expect(result.hourly.temperature_2m.length).toBeGreaterThan(0)
      );
    service
      .getforecast(43.3604218, -5.8450534)
      .subscribe((result) => expect(result.latitude).toBe(43.36));
  });
});
