import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '../../../node_modules/@angular/router';
import { AuthorizationService } from '../services/authorization.service';

const URL = environment.api_url;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authorizationService: AuthorizationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('userToken');

        if (userToken && request.url !== (URL + 'login')) {
            if (this.authorizationService.isLoggedIn()) {
                const cloned = request.clone({
                    headers: request.headers.set('Authorization', 'Bearer ' + userToken)
                });

                return next.handle(cloned);
            } else {
                this.authorizationService.logout();
                this.router.navigate(['']);
            }
        } else {
            return next.handle(request);
        }

    }
}