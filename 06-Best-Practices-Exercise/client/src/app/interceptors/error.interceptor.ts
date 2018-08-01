import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.toastr.error('401: Unauthorized', 'Warning!');
          } else if (err.status === 400) {
            this.toastr.error(err.error.message, 'Warning!');
            if (err.error.errors) {
              for (const e in err.error.errors) {
                if (err.error.errors.hasOwnProperty(e)) {
                  this.toastr.error(err.error.errors[e]);
                }
              }
            }
          }

          return throwError(err.error);
        }));
  }
}
