import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getAuthtoken() !== null) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.getAuthtoken(),
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }

  private getAuthtoken(): string {
    return localStorage.getItem('authToken');
  }
}
