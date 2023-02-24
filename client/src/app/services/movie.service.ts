import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdResponse } from '../models/id.response';
import { IMovie } from '../models/movie';

const baseUrl = 'http://localhost:3001/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {
    
  }

  getAll() {
    return this.http.get<IMovie[]>(baseUrl);
  }

  get(id: string) {
    return this.http.get<IMovie>(`${baseUrl}/${id}`);
  }

  create(data: IMovie) {
    return this.http.post<IdResponse>(baseUrl, data);
  }

  update(id: string, data: IMovie) {
    return this.http.put<IMovie>(`${baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
