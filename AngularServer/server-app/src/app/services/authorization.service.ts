import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { Login } from '../models/login';

const URL = environment.api_url;
const CHECK_INTERVAL = 1000; // in ms
const STORE_KEY =  'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  MINUTES_UNITL_AUTO_LOGOUT: number; // in mins

  constructor(private http: HttpClient, private router: Router) { }

  userAuthentication(userName: string, pass: string): Observable<Login> {
    const body = {user: userName, password: pass};
    return this.http.post<Login>(URL + 'login', body);
  }

  setSession(responseLogin: Login) {
    console.log(responseLogin);

    localStorage.setItem('userToken', responseLogin.token);
    localStorage.setItem('expires_at', responseLogin.expiration.toString() || '');
    localStorage.setItem('currentUserName', responseLogin.user);

    // se divide entre 60000 para pasar de milisegundos a minutos
    const minutes = (new Date(responseLogin['.expires']).getTime() - new Date().getTime()) / 60000;

    this.MINUTES_UNITL_AUTO_LOGOUT = minutes;

    this.initialAutoLogOut();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(): string {
    const expiration = localStorage.getItem('expires_at');

    return expiration;
  }

  // funcionalidad auto logOut
  initialAutoLogOut(): void {
    localStorage.setItem('isAutoLogout', 'false');
    this.setLastActionTime();
    this.checkToLogOut();
    this.initListener();
    this.initInterval();
  }

  getLastAction(): number {
    return Number(localStorage.getItem(STORE_KEY));
  }

  setLastAction(value: number): void {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  initListener(): void {
    document.body.addEventListener('click', () => this.setLastActionTime());
  }

  setLastActionTime(): void {
    const lastAction = Date.now();
    this.setLastAction(lastAction);
  }

  initInterval(): void {
    setInterval(() => {
      this.checkToLogOut();
    }, CHECK_INTERVAL);
  }

  checkToLogOut(): void {
    const now = Date.now();
    const timeleft = this.getLastAction() + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout && this.isLoggedIn()) {
      this.logout();
      localStorage.setItem('isAutoLogout', 'true');
    }
  }
}
