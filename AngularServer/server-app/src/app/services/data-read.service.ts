import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpointDHT = 'http://raspberrypi:8080/dht';
const endpointSDS011 = 'http://raspberrypi:8080/sds011';
const endpointEvolutionData = 'http://raspberrypi:8080/last_data';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataReadService {

  constructor(private http: HttpClient) { }

  getDHT(): Observable<any> {
    return this.http.get(endpointDHT);
  }

  getSDS011(): Observable<any> {
    return this.http.get(endpointSDS011);
  }

  getEvolutionData(): Observable<any> {
    return this.http.get(endpointEvolutionData);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
