import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePropertyListComponent } from './movie-property-list.component';

describe('MoviePropertyListComponent', () => {
  let component: MoviePropertyListComponent;
  let fixture: ComponentFixture<MoviePropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePropertyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
