import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private _movies = new BehaviorSubject<Movie[]>([]);

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

  create(movie: Movie) {
    const movieRequest = {
      year: 2023,
      cast: [],
      genre: [],
      ...movie
    }
    this.movieService.create(movieRequest)
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
