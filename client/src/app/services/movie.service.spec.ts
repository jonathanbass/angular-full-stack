import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { existingMovie, newMovie } from 'src/test/test.movies';

import { MovieService } from './movie.service';

describe('MoviesService', () => {
  let service: MovieService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    httpClientSpy.get.and.returnValue(of());
    httpClientSpy.post.and.returnValue(of());
    httpClientSpy.put.and.returnValue(of());
    httpClientSpy.delete.and.returnValue(of());

    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when we get all of the movies', () => {
    it('should GET all of the movies', () => {
      service.getAll();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('when we get a single movie', () => {
    it('should GET that single movie', () => {
      service.get('test-id-67576');
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('when we create a new movie', () => {
    it('should POST that movie', () => {
      service.create(newMovie);
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });

  describe('when we update a movie', () => {
    it('should PUT that movie', () => {
      service.update('test-id-3243234', existingMovie);
      expect(httpClientSpy.put.calls.count()).toBe(1);
    });
  });

  describe('when we delete a movie', () => {
    it('should DELETE that movie', () => {
      service.delete('test-id-25454');
      expect(httpClientSpy.delete.calls.count()).toBe(1);
    });
  });
});
