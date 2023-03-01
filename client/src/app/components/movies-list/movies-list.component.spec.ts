import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { MovieDataService } from 'src/app/services/movie.data.service';
import { existingMovie, newMovie, testMovies } from 'src/test/test.movies';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let movieDataServiceSpy: jasmine.SpyObj<MovieDataService>;
  
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async () => {
    movieDataServiceSpy = jasmine.createSpyObj('MovieDataService', ['getAll', 'delete']);
    movieDataServiceSpy.getAll.and.returnValue(of(testMovies));

    await TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      providers: [
        MoviesListComponent,
        { provide: MovieDataService, useValue: movieDataServiceSpy }
      ],
      declarations: [ MoviesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all movies should be retrieved', () => {
    expect(movieDataServiceSpy.getAll.calls.count()).toBe(1);
  });

  it('the correct number of movies should be returned', () => {
    expect(component.movies.data.length).toBe(testMovies.length);
  });

  describe('when we delete a movie for a given id', () => {
    it('should delete the movie', () => {
      fixture.componentInstance.deleteMovie(existingMovie);
      expect(movieDataServiceSpy.delete.calls.count()).toBe(1);
    });
  });

  describe('when we delete a movie and provide no id', () => {
    it('should NOT delete the movie', () => {
      fixture.componentInstance.deleteMovie(newMovie);
      expect(movieDataServiceSpy.delete.calls.count()).toBe(0);
    });
  });
});
