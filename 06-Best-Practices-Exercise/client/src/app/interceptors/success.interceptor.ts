import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuccessInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && request.url.endsWith('login')) {
              this.saveSession(event.body);
              this.toastr.success(event.body.message);
              this.router.navigate(['/home']);
            } else if (event instanceof HttpResponse && request.url.endsWith('signup')) {
              this.toastr.success(event.body.message);
              this.router.navigate(['/signin']);
            } else if (event instanceof HttpResponse && request.url.endsWith('create')) {
              this.toastr.success(event.body.message);
              this.router.navigate(['/all']);
            } else if (event instanceof HttpResponse && request.url.indexOf('details') !== -1) {
              if (event.body.message) {
                this.toastr.error(event.body.message);
                this.router.navigate(['/all']);
              }
            } else if (event instanceof HttpResponse && request.url.indexOf('delete') !== -1) {
              if (event.body.success) {
                this.toastr.success(event.body.message);
              } else {
                this.toastr.error(event.body.message);
                this.router.navigate(['/myFurniture']);
              }
            } else if (event instanceof HttpResponse && request.url.indexOf('edit') !== -1) {
              if (event.body.success) {
                this.toastr.success(event.body.message);
              } else {
                this.toastr.error(event.body.message);
              }
              this.router.navigate(['/all']);
            }
          }
        )
      );
  }

  private saveSession(res: object): void {
    localStorage.setItem('username', res['user']['name']);
    localStorage.setItem('isAdmin', res['user']['isAdmin']);
    localStorage.setItem('authToken', res['token']);
  }
}
