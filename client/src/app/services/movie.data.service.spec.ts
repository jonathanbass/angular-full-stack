import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { testMovies, newMovie } from 'src/test/test.movies';
import { MovieDataService } from './movie.data.service';
import { MovieService } from './movie.service';

describe('MoviesDataService', () => {
  let service: MovieDataService;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getAll', 'delete', 'create']);
    movieServiceSpy.getAll.and.returnValue(of(testMovies));
    movieServiceSpy.delete.and.returnValue(of());
    movieServiceSpy.create.and.returnValue(of());

    socketSpy = jasmine.createSpyObj('Socket', ['fromEvent']);
    socketSpy.fromEvent.and.returnValue(of(testMovies));
    
    TestBed.configureTestingModule({
      providers: [
        MovieDataService,
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: Socket, useValue: socketSpy }
      ]
    });

    service = TestBed.inject(MovieDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies on initialise', () => {
    expect(movieServiceSpy.getAll.calls.count()).toBe(1);
  });

  it('should register websocket on initialise', () => {
    expect(socketSpy.fromEvent.calls.count()).toBe(1);
  });

  describe('when we retrieve all of the movies', () => {
    it('should return all of the movies', () => {
      service.getAll().subscribe(movies => expect(movies.length).toBe(testMovies.length));
    });
  });

  describe('when we delete a movie', () => {
    it('should delete that specific movie', () => {
      const movieId = 'testid1234';
      service.delete(movieId);
      expect(movieServiceSpy.delete.calls.count()).toBe(1);
      expect(movieServiceSpy.delete).toHaveBeenCalledWith(movieId);
    });
  });

  describe('when we create a movie', () => {
    it('should add that specific movie', () => {
      service.create(newMovie);
      expect(movieServiceSpy.create.calls.count()).toBe(1);
      expect(movieServiceSpy.create).toHaveBeenCalledWith(newMovie);
    });
  });
});
