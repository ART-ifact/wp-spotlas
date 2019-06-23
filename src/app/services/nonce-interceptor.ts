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
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()

export class NonceInterceptor implements HttpInterceptor {

  constructor(
            private authService: AuthService,
            private router: Router,
            private storage : LocalStorageService
            ) { }

  // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

      if (this.storage.getItem('NONCE') !== null) {
        request = request.clone({
          setHeaders: {
            'X-WP-NONCE': `${this.storage.getItem('NONCE')}`
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
                this.authService.nonce = null;
                this.router.navigate(['/loginpage'])
              break
          }

          return new Observable<never>();
        }

      }));
    }
}
