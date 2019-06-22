import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()

export class NonceInterceptor implements HttpInterceptor {

  constructor(
            private loginService: LoginService,
            private router: Router) { }

  // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

      if (this.loginService.nonce !== null) {
        request = request.clone({
          setHeaders: {
            'X-WP-NONCE': `${this.loginService.nonce}`
          },
          withCredentials: true
        });
      } else {
        request = request.clone({withCredentials: true});
      }
      return next.handle(request).pipe(catchError((error)  => {

        if (error instanceof HttpErrorResponse) {

          switch(error.status) {
            case 401:
                this.router.navigate(['/loginpage']);
              break;
            case 403:
                console.log('nope')
                this.loginService.nonce = null;
              break
          }

          return new Observable<never>();
        }

      }));
    }
}
