import { Component, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieDataService } from 'src/app/services/movie.data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})

export class AddMovieComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    runtime: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)])
  });
  
  constructor(private movieDataService: MovieDataService) {

  }
  get title() { return this.form?.get('title'); }

  get runtime() { return this.form?.get('runtime'); }

  createMovie(event: Event) {
    event.preventDefault();
    if (this.form?.valid) {
      const newMovie = {
        title: this.form.get('title')?.getRawValue() || '',
        runtime: (this.form.get('runtime')?.getRawValue() || 0) as number
      };

      this.movieDataService.create(newMovie);
    }
  }
}
