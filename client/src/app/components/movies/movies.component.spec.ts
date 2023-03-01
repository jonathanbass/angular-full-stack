import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { MoviePropertyListComponent } from '../movie-property-list/movie-property-list.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';

import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let socketSpy: jasmine.SpyObj<Socket>;

  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of());

    socketSpy = jasmine.createSpyObj('Socket', ['fromEvent']);
    socketSpy.fromEvent.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        MoviesComponent,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Socket, useValue: socketSpy }
      ],
      declarations: [
        MoviesComponent,
        AddMovieComponent,
        MoviesListComponent,
        MoviePropertyListComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
