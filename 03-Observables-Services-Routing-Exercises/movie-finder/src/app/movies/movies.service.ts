import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../movie/movie';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '&api_key=8863b65e7c0cd50e87a65bb6de1a6a99';
const API_KEY_ALT = '?api_key=8863b65e7c0cd50e87a65bb6de1a6a99';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popularEndpoint = 'discover/movie?sort_by=popularity.desc';
  theatersEndpoint = 'discover/movie?primary_release_date.gte=2018-07-15&primary_release_date.lte=2018-11-22';
  kidsEndpoint = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  dramasEndpoint = 'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10';
  searchMovieEndpoint = 'search/movie';

  constructor(private http: HttpClient) { }

  getPopular(): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + this.popularEndpoint + API_KEY);
  }

  getTheaters(): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + this.theatersEndpoint + API_KEY);
  }

  getKids(): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + this.kidsEndpoint + API_KEY);
  }

  getDramas(): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + this.dramasEndpoint + API_KEY);
  }

  getMovie(id): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + `movie/${id}` + API_KEY_ALT);
  }

  searchMovies(query: string): Observable<Movie> {
    return this.http.get<Movie>(BASE_URL + this.searchMovieEndpoint + API_KEY_ALT + `&query=${query}`);
  }
}
