import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../models/movie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private _movies = new BehaviorSubject<IMovie[]>([]);

  constructor(private movieService: MovieService) {
    this.movieService.getAll()
      .subscribe({
        next: (movies) => {
          this._movies.next(movies);
        },
        error: (error) => {
          throw new Error(error.message);
        }
      });
  }

  getAll() {
    return this._movies.asObservable();
  }

  delete(id: string) {
    this.movieService.delete(id)
      .subscribe({
        next: () => {
          const movies = this._movies.getValue();
          const filteredMovies = movies.filter((movie) => {
            return movie._id !== id;
          });

          this._movies.next(filteredMovies);
        },
        error: (error) => {
          throw new Error(error.message);
        }
      });
  }

  create(movie: IMovie) {
    this.movieService.create(movie)
      .subscribe({
        next: (response) => {
          const movies = this._movies.getValue();
          movies.push({ _id: response.id, ...movie });
          this._movies.next(movies);
        },
        error: (error) => {
          throw new Error(error.message);
        }
      });
  }
}
