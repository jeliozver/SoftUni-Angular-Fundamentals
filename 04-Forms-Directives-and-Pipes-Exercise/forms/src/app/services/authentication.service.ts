import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const appKey = 'kid_BknrkNzqM';
const appSecret = 'f97d0e366aba45fa9e936342874134ac';
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getAuthtoken(): string {
    return localStorage.getItem('authToken');
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  isLogged(): boolean {
    return this.getAuthtoken() !== null;
  }

  saveSession(res: object): void {
    localStorage.setItem('username', res['username']);
    localStorage.setItem('authToken', res['_kmd']['authtoken']);
    localStorage.setItem('userId', res['_id']);
  }

  clearSession(): void {
    localStorage.clear();
  }

  login(payload: object): Observable<Object> {
    return this.http.post<object>(loginUrl, JSON.stringify(payload), this.getBasicAuthHeader())
      .pipe(
        catchError(this.handleError)
      );
  }

  register(payload: Object): Observable<Object> {
    return this.http.post<object>(registerUrl, JSON.stringify(payload), this.getBasicAuthHeader())
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<Object> {
    return this.http.post<object>(logoutUrl, {}, this.getKinveyAuthHeader())
      .pipe(
        catchError(this.handleError)
      );
  }

  private getBasicAuthHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
        'Content-Type': 'application/json'
      })
    };
  }

  private getKinveyAuthHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Kinvey ' + this.getAuthtoken(),
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      console.log('Network error');
    } else {
      console.error(error.error);
      console.log('Backend error');
    }

    return throwError(`${error.error['description']}`);
  }

}
