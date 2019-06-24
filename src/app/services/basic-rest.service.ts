import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  public get<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(environment.api + path).pipe(
      tap(
        success => {
          if (isDevMode()) {
            //console.log('GET success' + path);
          }

        },
        error => this.handleError(error)
      )
    );
  }

  public post<T>(path: string, data: any): Observable<T> {
    return this.httpClient.post<T>(environment.api + path, data).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('POST success' + path);
          }
        },
        error => this.handleError(error)
      )
    );
  }


  public postMedia<T>(path: string, data: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-WP-NONCE': `${this.storage.getItem('MEDIANONCE')}`
      })
    };
    return this.httpClient.post<T>(environment.api + path, data, httpOptions).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('POST success' + path);
          }
        },
        error => this.handleError(error)
      )
    );
  }

  public put<T>(path: string, data: any): Observable<T> {
    return this.httpClient.put<T>(environment.api + path, data).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('Put success' + path);
          }
        },
        error => this.handleError(error)
      )
    );
  }

  public delete<T>(path: string): Observable<T> {
    return this.httpClient.delete<T>(environment.api + path).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('DELETE success' + path);
          }
        },
        error => this.handleError(error)
      )
    );
  }

  public deleteMedia<T>(path: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-WP-NONCE': `${this.storage.getItem('MEDIANONCE')}`
      })
    };
    return this.httpClient.delete<T>(environment.api + path, httpOptions).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('DELETE success' + path);
          }
        },
        error => this.handleError(error)
      )
    );
  }

  public getDataCount<T>(path: string): Observable<number> {
    return this.httpClient.get<T>(environment.api + path).pipe(
      tap(
        success => {
          if (isDevMode()) {
            console.log('GET success' + path);
          }
        },
        error => this.handleError(error)
      ),
      map(
        (item: any) => {
          //todo map if needed
          return item;
        }
      )
    );
  }

  public handleError(error: Error): Observable<string> {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 500:
          console.log('Laden Sie bitte die Seite neu');
          break;
        case 404:
          //this.router.navigate(['/not-found']);
          break;
        case 403:
          this.router.navigate(['/loginpage']);
          return Observable.throw(error.error.text);
          break;
        default:
          //this.errorMessageService.errors.emit(new Error(`Fehler ${error.status} ${error.message}`));
          break;
      }
    } else {
      // other types of errors

    }
  }
}
