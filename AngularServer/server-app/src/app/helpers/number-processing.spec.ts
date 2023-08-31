import { async, TestBed } from "@angular/core/testing";
import { truncTo2Decimals } from "./number-processing";

describe("NumberProcessingHelper", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [],
    }).compileComponents();
  }));

  it("should return number with 2 decimals rounded to lower", () => {
    const truncatedNumberA = truncTo2Decimals(18.5066);
    const truncatedNumberB = truncTo2Decimals(18.5046);
    const truncatedNumberC = truncTo2Decimals(18.44);
    const truncatedNumberD = truncTo2Decimals(18);
    const truncatedNumberE = truncTo2Decimals(18.1);

    expect(truncatedNumberA).toBe(18.5);
    expect(truncatedNumberB).toBe(18.5);
    expect(truncatedNumberC).toBe(18.44);
    expect(truncatedNumberD).toBe(18.0);
    expect(truncatedNumberE).toBe(18.1);
  });
});
