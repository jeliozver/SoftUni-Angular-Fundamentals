import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

const appKey = 'kid_BknrkNzqM';
const appSecret = 'f97d0e366aba45fa9e936342874134ac';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
          'Content-Type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Kinvey ' + this.getAuthtoken(),
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && request.url.endsWith('login')) {
              this.saveSession(event.body);
            } else if (event instanceof HttpResponse && request.url.endsWith(appKey)) {
              this.saveSession(event.body);
            } else if (event instanceof HttpResponse && request.url.endsWith('_logout')) {
              this.clearSession();
            }
          }
        )
      );
  }

  private getAuthtoken(): string {
    return localStorage.getItem('authToken');
  }

  private saveSession(res: object): void {
    localStorage.setItem('username', res['username']);
    localStorage.setItem('authToken', res['_kmd']['authtoken']);
    localStorage.setItem('userId', res['_id']);
  }

  private clearSession(): void {
    localStorage.clear();
  }
}
