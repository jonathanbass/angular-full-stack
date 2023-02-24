import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IMovie } from '../models/movie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private _movies = new BehaviorSubject<IMovie[]>([]);

  constructor(private movieService: MovieService, private socket: Socket) {
    this.movieService.getAll()
      .subscribe({
        next: (movies) => {
          this._movies.next(movies);
        },
        error: (error) => {
          throw new Error(error.message);
        }
      });

    this.socket.fromEvent<IMovie[]>('movies-updated')
      .subscribe({
        next: (movies) => this._movies.next(movies)
      });
  }

  getAll() {
    return this._movies.asObservable();
  }

  delete(id: string) {
    this.movieService.delete(id)
      .subscribe({
        error: (error) => {
          throw new Error(error.message);
        }
      });
  }

  create(movie: IMovie) {
    this.movieService.create(movie)
      .subscribe({
        error: (error) => {
          throw new Error(error.message);
        }
      });
  }
}
