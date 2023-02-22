import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:3001/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {
    
  }

  getAll() {
    return this.http.get<Movie[]>(baseUrl);
  }

  get(id: string) {
    return this.http.get<Movie>(`${baseUrl}/${id}`);
  }

  create(data: Movie) {
    return this.http.post<Movie>(baseUrl, data);
  }

  update(id: string, data: Movie) {
    return this.http.put<Movie>(`${baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
