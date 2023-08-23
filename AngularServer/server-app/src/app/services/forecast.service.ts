import { Injectable } from "@angular/core";
import { ForecastResponse } from "../models/forecast";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const endpointGeolocalization =
  "https://api.open-meteo.com/v1/forecast?latitude=LATITUDE&longitude=LONGITUDE&current_weather=true&hourly=temperature_2m,relativehumidity_2m";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  truncTo2Decimals(receivedNumber: number): number {
    return Math.trunc(receivedNumber * 100) / 100;
  }

  getforecast(
    latitude: number,
    longitude: number
  ): Observable<ForecastResponse> {
    let endpointCompleted = endpointGeolocalization.replace(
      "LATITUDE",
      this.truncTo2Decimals(latitude).toString()
    );
    endpointCompleted = endpointGeolocalization.replace(
      "LONGITUDE",
      this.truncTo2Decimals(longitude).toString()
    );

    return this.http.get<ForecastResponse>(endpointCompleted);
  }
}
