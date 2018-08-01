import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Furniture } from './models/furniture.model';

const baseUrl = 'http://localhost:8000/furniture/';
const createEndpoint = baseUrl + 'create';
const getAllEndpoint = baseUrl + 'all';
const detailsEndpoint = baseUrl + 'details/';
const myFurnitureEndpoint = baseUrl + 'mine';
const deleteEndpoint = baseUrl + 'delete/';
const editEndpoint = baseUrl + 'edit/';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) { }

  create(body: object): Observable<object> {
    return this.http.post<object>(createEndpoint, JSON.stringify(body));
  }

  getAll(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(getAllEndpoint);
  }

  getMy(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(myFurnitureEndpoint);
  }

  getSingle(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(detailsEndpoint + id);
  }

  deleteSingle(id: string): Observable<object> {
    return this.http.delete<object>(deleteEndpoint + id);
  }

  editSingle(id: string, body: object): Observable<object> {
    return this.http.put<object>(editEndpoint + id, body);
  }
}
