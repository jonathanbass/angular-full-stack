import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyType } from 'src/app/models/property.type';
import { MovieDataService } from 'src/app/services/movie.data.service';
import { PropertyDataService } from 'src/app/services/property.data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})

export class AddMovieComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number>(1900, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    runtime: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(1000)]),
    cast: new FormControl(''),
    genre: new FormControl('')
  });

  castValues: string[] = [];
  genreValues: string[] = [];
  castType = PropertyType.CAST;
  genreType = PropertyType.GENRE;

  constructor(private movieDataService: MovieDataService, private propertyService: PropertyDataService) {
    this.propertyService.getCast()
      .subscribe({
        next: (cast) => this.castValues = cast
      });

    this.propertyService.getGenre()
      .subscribe({
        next: (genre) => this.genreValues = genre
      });
  }

  get title() { return this.form.get('title'); }
  get year() { return this.form.get('year'); }
  get runtime() { return this.form.get('runtime'); }
  get cast() { return this.form.get('cast'); }
  get genre() { return this.form.get('genre'); }

  createMovie(event: Event) {
    event.preventDefault();
    
    if (this.form.invalid) {
      return;
    }

    const newMovie = {
      title: this.title?.value || '',
      year: this.form.get('year')?.value || 0,
      runtime: this.form.get('runtime')?.value || 0,
      cast: this.castValues,
      genre: this.genreValues
    };

    this.movieDataService.create(newMovie);
    this.title?.setValue('');
    this.year?.setValue(1900);
    this.runtime?.setValue(0);
    this.propertyService.deleteAllCast();
    this.propertyService.deleteAllGenre();
  }

  addCast() {
    if (!this.cast?.value) {
      return;
    }

    this.propertyService.addCast(this.cast.value);
    this.cast?.setValue('');
  }

  addGenre() {
    if (!this.genre?.value) {
      return;
    }

    this.propertyService.addGenre(this.genre.value);
    this.genre?.setValue('');
  }
}
