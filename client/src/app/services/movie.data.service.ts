import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private _movies = new BehaviorSubject<Movie[]>([]);

  constructor(private moviesService: MovieService) {
    this.moviesService.getAll()
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
    this.moviesService.delete(id)
    .subscribe({
      next: () => {
        const movies = this._movies.getValue();
        const newMovieList = movies.filter((movie) => {
          return movie._id !== id;
        });

        this._movies.next(newMovieList);
      },
      error: (error) => {
        throw new Error(error.message);
      }
    });
  }
}
