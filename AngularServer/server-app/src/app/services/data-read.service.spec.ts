import { TestBed } from "@angular/core/testing";

import { DataReadService } from "./data-read.service";
import { HttpClientModule } from "@angular/common/http";

describe("DataReadService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataReadService],
    })
  );
  it("should be created", () => {
    const service: DataReadService = TestBed.get(DataReadService);
    expect(service).toBeTruthy();
  });

  it("temperature and humidity should be returned", () => {
    const service: DataReadService = TestBed.get(DataReadService);
    service
      .getDHT()
      .subscribe((result) => expect(result.temp).toBeGreaterThan(0));
    service
      .getDHT()
      .subscribe((result) => expect(result.hum).toBeGreaterThan(0));
  });

  it("particles should be returned", () => {
    const service: DataReadService = TestBed.get(DataReadService);
    service
      .getSDS011Mock()
      .subscribe((result) => expect(result.pm25).toBeGreaterThan(0));
    service
      .getSDS011Mock()
      .subscribe((result) => expect(result.pm100).toBeGreaterThan(0));
  });

  it("data for graphs should contain at least 28 elements", () => {
    const service: DataReadService = TestBed.get(DataReadService);
    service
      .getEvolutionData()
      .subscribe((result) => expect(result.length).toBeGreaterThan(27));
  });
});
