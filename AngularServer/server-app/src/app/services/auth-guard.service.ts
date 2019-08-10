import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthorizationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let accessPermit = true;
    const expectedRole = route.data.expectedRole.split(',');

    if (!this.auth.isLoggedIn() && expectedRole.indexOf('login') < 0) {
      accessPermit = false;
    }  else {
      accessPermit = true;
    }

    if (!accessPermit) {
      this.router.navigate(['login']);
    }

    return accessPermit;
  }
}
