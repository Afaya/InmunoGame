import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-prediction-page",
  templateUrl: "./prediction-page.component.html",
  styleUrls: ["./prediction-page.component.scss"],
})
export class PredictionPageComponent implements OnInit {
  title = "Next hours prediction";
  cityToSearch: string = "";

  isForecastDisplayed = false;

  constructor() {}

  ngOnInit() {}

  showForecast(): void {
    console.log("City " + this.cityToSearch);
  }
}
