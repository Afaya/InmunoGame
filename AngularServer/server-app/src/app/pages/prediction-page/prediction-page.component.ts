import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { calculateInfluenzaRatius } from "src/app/helpers/risk-calculation";
import { Risk } from "src/app/models/risks";
import { ForecastService } from "src/app/services/forecast.service";
import { GeolocalizationService } from "src/app/services/geolocalization.service";
import { SpinnerService } from "src/app/services/spinner.service";

@Component({
  selector: "app-prediction-page",
  templateUrl: "./prediction-page.component.html",
  styleUrls: ["./prediction-page.component.scss"],
})
export class PredictionPageComponent implements OnInit {
  title = "Next hours prediction";
  cityToSearch: string = "";

  isForecastDisplayed = false;
  isErrorDisplayed = false;

  influenzaRisks: Risk[] = [];

  constructor(
    private forecastService: ForecastService,
    private geolocalizationService: GeolocalizationService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit() {}

  goBack(): void {
    this.router.navigate(["/home"]);
  }

  showForecast(): void {
    this.spinnerService.startOnLoading();
    this.getCoordinates();
  }

  getCoordinates(): void {
    this.geolocalizationService.getCoordinates(this.cityToSearch).subscribe(
      (data) => {
        if (data && data[0] && data[0].lat && data[0].lon) {
          const lat = Number(data[0].lat);
          const lon = Number(data[0].lon);

          this.getForecast(lat, lon);
        } else {
          this.displayError(true);
        }
      },
      (error) => {
        this.displayError(true);
      }
    );
  }

  displayError(isError: boolean): void {
    this.isErrorDisplayed = isError;
    this.isForecastDisplayed = !isError;
    this.spinnerService.finishOnLoading();
  }

  getForecast(latitude: number, longitude: number): void {
    this.forecastService.getforecast(latitude, longitude).subscribe(
      (data) => {
        if (
          data &&
          data.hourly &&
          data.hourly.time &&
          data.hourly.temperature_2m &&
          data.hourly.relativehumidity_2m
        ) {
          this.influenzaRisks = [];
          const dataLength = data.hourly.time.length;
          for (let i = 0; i < dataLength; i++) {
            if (
              data.hourly.temperature_2m[i] &&
              data.hourly.relativehumidity_2m[i]
            ) {
              let calculatedRisk = calculateInfluenzaRatius(
                data.hourly.temperature_2m[i],
                data.hourly.relativehumidity_2m[i]
              );
              const dateAndTime = data.hourly.time[i].toString().split("T");
              calculatedRisk.hour =
                dateAndTime && dateAndTime.length > 0
                  ? dateAndTime[1]
                  : "Hora " + i;
              this.influenzaRisks.push(calculatedRisk);
            }
          }
          this.displayError(false);
        } else {
          this.displayError(true);
        }
      },
      (error) => {
        this.displayError(true);
      }
    );
  }
}
