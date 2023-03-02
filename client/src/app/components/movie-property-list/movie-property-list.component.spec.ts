import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyType } from 'src/app/models/property.type';
import { PropertyDataService } from 'src/app/services/property.data.service';

import { MoviePropertyListComponent } from './movie-property-list.component';

describe('MoviePropertyListComponent', () => {
  let component: MoviePropertyListComponent;
  let fixture: ComponentFixture<MoviePropertyListComponent>;
  let propertyDataServiceSpy: jasmine.SpyObj<PropertyDataService>;

  beforeEach(async () => {
    propertyDataServiceSpy = jasmine.createSpyObj('PropertyDataService', ['deleteCast', 'deleteGenre']);

    await TestBed.configureTestingModule({
      providers: [
        MoviePropertyListComponent,
        { provide: PropertyDataService, useValue: propertyDataServiceSpy }
      ],
      declarations: [MoviePropertyListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviePropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when property type is NOT set and we remove the item', () => {
    it('should throw the correct error', () => {
      expect(() => component.remove('Kanye Test'))
        .toThrow(new Error('must specify "propertyName" attribute on property list component.'));
    });
  });

  describe('when property type is set to CAST and we remove the item', () => {
    it('should delete a single cast member', () => {
      component.propertyType = PropertyType.CAST;
      component.remove('Kanye Test');
      expect(propertyDataServiceSpy.deleteCast.calls.count()).toBe(1);
    });
  });

  describe('when property type is set to GENRE and we remove the item', () => {
    it('should delete a single genre', () => {
      component.propertyType = PropertyType.GENRE;
      component.remove('Kanye Test');
      expect(propertyDataServiceSpy.deleteGenre.calls.count()).toBe(1);
    });
  });
});
