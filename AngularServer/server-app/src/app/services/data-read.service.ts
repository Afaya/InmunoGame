import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { DHTData, SDS011Data } from "../models/sensors";

const endpointDHT = "http://raspberrypi:8080/dht";
const endpointSDS011 = "http://raspberrypi:8080/sds011";
const endpointEvolutionData = "http://raspberrypi:8080/last_data";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class DataReadService {
  constructor(private http: HttpClient) {}

  getDHT(): Observable<DHTData> {
    return this.http.get<DHTData>(endpointDHT);
  }

  getDHTMock(): Observable<DHTData> {
    return of({
      temp: 37.5,
      hum: 3,
    });
  }

  getSDS011(): Observable<SDS011Data> {
    return this.http.get<SDS011Data>(endpointSDS011);
  }

  getSDS011Mock(): Observable<SDS011Data> {
    return of({
      pm25: 10,
      pm100: 5,
    });
  }

  getEvolutionData(): Observable<any> {
    return this.http.get(endpointEvolutionData);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
