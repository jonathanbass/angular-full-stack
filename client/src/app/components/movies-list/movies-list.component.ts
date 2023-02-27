import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IMovie } from 'src/app/models/movie';
import { MovieDataService } from 'src/app/services/movie.data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies = new MatTableDataSource<IMovie>();
  displayedColumns = ['id', 'year', 'title', 'runtime', 'cast', 'genre', 'delete'];

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
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

  deleteMovie(movie: IMovie) {
    if (!movie._id) {
      return;
    }

    this.movieDataService.delete(movie._id);
  }
}
