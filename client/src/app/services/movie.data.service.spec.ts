import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { MovieDataService } from './movie.data.service';
import { MovieService } from './movie.service';

describe('MoviesDataService', () => {
  let service: MovieDataService;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getAll']);
    movieServiceSpy.getAll.and.returnValue(of([]));

    socketSpy = jasmine.createSpyObj('Socket', ['fromEvent']);
    socketSpy.fromEvent.and.returnValue(of([]));
    
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
});
