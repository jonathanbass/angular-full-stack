import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/app/models/movie.model';
import { MovieDataService } from 'src/app/services/movie.data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies = new MatTableDataSource<Movie>();
  currentMovie: Movie = {};
  currentIndex = -1;
  title = '';
  displayedColumns = ['id', 'title', 'runtime', 'delete'];

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieDataService.getAll()
      .subscribe({
        next: (data) => {
          this.movies.data = data;
        }
      });
  }

  deleteMovie(movie: Movie, index: number) {
    this.currentMovie = movie;
    this.currentIndex = index;

    if (!movie._id) {
      return;
    }

    this.movieDataService.delete(movie._id);
  }
}
