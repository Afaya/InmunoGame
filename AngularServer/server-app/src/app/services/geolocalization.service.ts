import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeoLocalizationResponse } from "../models/geolocalization";

const endpointGeolocalization = "https://geocode.maps.co/search?q=";

@Injectable({
  providedIn: "root",
})
export class GeolocalizationService {
  constructor(private http: HttpClient) {}

  getCoordinates(cityName: String): Observable<GeoLocalizationResponse[]> {
    const cityNameProcessed = cityName.split(" ").join("%20");
    return this.http.get<GeoLocalizationResponse[]>(
      endpointGeolocalization + cityNameProcessed
    );
  }
}
