import { Component, OnInit } from "@angular/core";
import { DataReadService } from "src/app/services/data-read.service";
import { SpinnerService } from "src/app/services/spinner.service";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { DHTData, SDS011Data } from "src/app/models/sensors";

@Component({
  selector: "app-sensor-home",
  templateUrl: "./sensor-home.component.html",
  styleUrls: ["./sensor-home.component.scss"],
})
export class SensorHomeComponent implements OnInit {
  title = "server-app with sensors";
  influenzaRisk = "";
  particlesRisk = "";
  influenzaRiskDescription = "";
  particlesRiskDescription = "";
  influenzaClass = "";
  particlesClass = "";

  temperature: number;
  humidity: number;
  temperatureLevelHighRisk = 5;
  temperatureLevelMediumRisk = 10;
  humidityLevelHighRisk = 20;
  humidityLevelMediumRisk = 30;
  pm25: number;
  pm100: number;
  particlesLevelExtraHighRisk = 150;
  particlesLevelHighRisk = 100;
  particlesLevelMediumRisk = 50;

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
        this.calculateInfluenzaRatius(response[0]);
        this.calculateParticlesRisk(response[1]);
        this.spinnerService.finishOnLoading();
        this.isErrorDisplayed = false;
      },
      (error) => {
        this.spinnerService.finishOnLoading();
        this.isErrorDisplayed = true;
      }
    );
  }

  calculateInfluenzaRatius(apiData: DHTData): void {
    this.temperature = Number(apiData.temp);
    this.humidity = Number(apiData.hum);
    if (
      this.temperature < this.temperatureLevelHighRisk &&
      this.humidity < this.humidityLevelHighRisk
    ) {
      this.influenzaRisk = "Muy Alta";
      this.influenzaRiskDescription =
        "Ventile la habitación, y aumente la temperatura de la misma y su humedad";
      this.influenzaClass = "extraHighRisk";
    } else if (
      this.temperature < this.temperatureLevelHighRisk ||
      this.humidity < this.humidityLevelHighRisk
    ) {
      this.influenzaRisk = "Alta";
      this.influenzaRiskDescription = "Ventile la habitación, y ";
      this.influenzaRiskDescription +=
        this.temperature < this.temperatureLevelHighRisk
          ? "aumente la temperatura de la habitación"
          : "aumente la humedad de la habitación";
      this.influenzaClass = "highRisk";
    } else if (
      this.temperature < this.temperatureLevelMediumRisk &&
      this.humidity < this.humidityLevelMediumRisk
    ) {
      this.influenzaRisk = "Media";
      this.influenzaRiskDescription =
        "Aumente la temperatura de la habitación o su humedad";
      this.influenzaClass = "mediumRisk";
    } else {
      this.influenzaRisk = "Baja";
      this.influenzaRiskDescription =
        "Las condiciones de temperatura y humedad de la habitación son las adecuadas";
      this.influenzaClass = "lowRisk";
    }
  }

  calculateParticlesRisk(apiData: SDS011Data): void {
    this.pm25 = Number(apiData.pm25);
    this.pm100 = Number(apiData.pm100);
    if (
      this.pm25 > this.particlesLevelExtraHighRisk &&
      this.pm100 > this.particlesLevelExtraHighRisk
    ) {
      this.particlesRisk = "Muy Alta";
      this.particlesRiskDescription = "Ventile la habitación y aspire el polvo";
      this.particlesClass = "extraHighRisk";
    } else if (
      this.pm25 > this.particlesLevelHighRisk ||
      this.pm100 > this.particlesLevelHighRisk
    ) {
      this.particlesRisk = "Alta";
      this.particlesRiskDescription = "Aspire el polvo de la estancia";
      this.particlesClass = "highRisk";
    } else if (
      this.pm25 > this.particlesLevelMediumRisk ||
      this.pm100 > this.particlesLevelMediumRisk
    ) {
      this.particlesRisk = "Media";
      this.particlesRiskDescription = "Ventile la habitación";
      this.particlesClass = "mediumRisk";
    } else {
      this.particlesRisk = "Baja";
      this.particlesRiskDescription =
        "El nivel de partículas en suspensión es el adecuado";
      this.particlesClass = "lowRisk";
    }
  }

  getInfluenzaClass(): string {
    return this.influenzaClass;
  }

  getParticlesClass(): string {
    return this.particlesClass;
  }

  seeEvolutionData(): void {
    this.router.navigate(["/evolution"]);
  }

  seePredictions(): void {
    this.router.navigate(["/prediction"]);
  }
}
