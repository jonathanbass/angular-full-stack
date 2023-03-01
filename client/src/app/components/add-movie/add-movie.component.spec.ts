import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { MovieDataService } from 'src/app/services/movie.data.service';
import { PropertyDataService } from 'src/app/services/property.data.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { MoviePropertyListComponent } from '../movie-property-list/movie-property-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let movieDataServiceSpy: jasmine.SpyObj<MovieDataService>;
  let propertyDataServiceSpy: jasmine.SpyObj<PropertyDataService>;

  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    movieDataServiceSpy = jasmine.createSpyObj('MovieDataService', ['create']);

    propertyDataServiceSpy = jasmine.createSpyObj('PropertyDataService',
      ['getCast', 'getGenre', 'addCast', 'addGenre', 'deleteAllCast', 'deleteAllGenre']);
    propertyDataServiceSpy.getCast.and.returnValue(of([]));
    propertyDataServiceSpy.getGenre.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      providers: [
        AddMovieComponent,
        { provide: MovieDataService, useValue: movieDataServiceSpy },
        { provide: PropertyDataService, useValue: propertyDataServiceSpy }
      ],
      declarations: [AddMovieComponent, MoviePropertyListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCast on initialise', () => {
    expect(propertyDataServiceSpy.getCast.calls.count()).toBe(1);
  });

  it('should call getGenre on initialise', () => {
    expect(propertyDataServiceSpy.getGenre.calls.count()).toBe(1);
  });

  describe('when the form is VALID and we click to create a movie', () => {
    beforeEach(() => {
      fixture.componentInstance.title?.setValue('test movie');
      fixture.componentInstance.createMovie(new Event('click'));
    });
    
    it('should create the movie', () => {
      expect(movieDataServiceSpy.create.calls.count()).toBe(1);
    });

    it('should delete all the cast', () => {
      expect(propertyDataServiceSpy.deleteAllCast.calls.count()).toBe(1);
    });

    it('should delete all the genres', () => {
      expect(propertyDataServiceSpy.deleteAllGenre.calls.count()).toBe(1);
    });
  });

  describe('when the form is INVALID and we click to create a movie', () => {
    beforeEach(() => {
      fixture.componentInstance.title?.setValue(null);
      fixture.componentInstance.createMovie(new Event('click'));
    });
    
    it('should NOT create the movie', () => {
      expect(movieDataServiceSpy.create.calls.count()).toBe(0);
    });

    it('should NOT delete all the cast', () => {
      expect(propertyDataServiceSpy.deleteAllCast.calls.count()).toBe(0);
    });

    it('should NOT delete all the genres', () => {
      expect(propertyDataServiceSpy.deleteAllGenre.calls.count()).toBe(0);
    });
  });

  describe('when the cast member is entered and we click to add', () => {
    it('should add the new cast member', () => {
      fixture.componentInstance.cast?.setValue('Kanye Test');
      fixture.componentInstance.addCast();
      expect(propertyDataServiceSpy.addCast.calls.count()).toBe(1);
    });
  });

  describe('when the cast member is empty and we click to add', () => {
    it('should NOT add the new cast member', () => {
      fixture.componentInstance.cast?.setValue(null);
      fixture.componentInstance.addCast();
      expect(propertyDataServiceSpy.addCast.calls.count()).toBe(0);
    });
  });

  describe('when a new genre is entered and we click to add', () => {
    it('should add the new genre', () => {
      fixture.componentInstance.genre?.setValue('Test Documentaries');
      fixture.componentInstance.addGenre();
      expect(propertyDataServiceSpy.addGenre.calls.count()).toBe(1);
    });
  });

  describe('when genre is empty and we click to add', () => {
    it('should NOT add the new genre', () => {
      fixture.componentInstance.genre?.setValue(null);
      fixture.componentInstance.addGenre();
      expect(propertyDataServiceSpy.addGenre.calls.count()).toBe(0);
    });
  });
});
