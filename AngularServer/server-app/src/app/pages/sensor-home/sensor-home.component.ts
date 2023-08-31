import { Component, OnInit } from "@angular/core";
import { DataReadService } from "src/app/services/data-read.service";
import { SpinnerService } from "src/app/services/spinner.service";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";
import {
  calculateInfluenzaRatius,
  calculateParticlesRisk,
} from "src/app/helpers/risk-calculation";
import { Risk } from "src/app/models/risks";

@Component({
  selector: "app-sensor-home",
  templateUrl: "./sensor-home.component.html",
  styleUrls: ["./sensor-home.component.scss"],
})
export class SensorHomeComponent implements OnInit {
  title = "server-app with sensors";

  riskInfluenza: Risk = undefined;
  riskParticles: Risk = undefined;

  temperature: number;
  humidity: number;
  pm25: number;
  pm100: number;

  isErrorDisplayed = false;

  constructor(
    private router: Router,
    private dataReadService: DataReadService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.readData();
    setInterval(() => {
      this.readData();
    }, 3000);
  }

  readData(): void {
    this.spinnerService.startOnLoading();
    forkJoin(
      this.dataReadService.getDHT(),
      this.dataReadService.getSDS011()
      // this.dataReadService.getDHTMock(),
      // this.dataReadService.getSDS011Mock()
    ).subscribe(
      (response) => {
        this.riskInfluenza = calculateInfluenzaRatius(
          Number(response[0].temp),
          Number(response[0].hum)
        );
        this.riskParticles = calculateParticlesRisk(
          Number(response[1].pm25),
          Number(response[1].pm100)
        );
        this.spinnerService.finishOnLoading();
        this.isErrorDisplayed = false;
      },
      (error) => {
        this.spinnerService.finishOnLoading();
        this.isErrorDisplayed = true;
      }
    );
  }

  getInfluenzaClass(): string {
    return this.riskInfluenza.class;
  }

  getParticlesClass(): string {
    return this.riskParticles.class;
  }

  seeEvolutionData(): void {
    this.router.navigate(["/evolution"]);
  }

  seePredictions(): void {
    this.router.navigate(["/prediction"]);
  }
}
