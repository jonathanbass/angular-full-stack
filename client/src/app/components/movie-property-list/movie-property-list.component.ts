import { Component, Input } from '@angular/core';
import { PropertyType } from 'src/app/models/property.type';
import { PropertyDataService } from 'src/app/services/property.data.service';

@Component({
  selector: 'app-movie-property-list',
  templateUrl: './movie-property-list.component.html',
  styleUrls: ['./movie-property-list.component.scss']
})
export class MoviePropertyListComponent {
  @Input() propertyType?: PropertyType;
  @Input() list: string[] = [];
  @Input() deletable = false;

  constructor(private propertyService: PropertyDataService) {

  }

  remove(item: string) {
    switch (this.propertyType) {
      case PropertyType.CAST:
        this.propertyService.deleteCast(item);
        break;
      case PropertyType.GENRE:
        this.propertyService.deleteGenre(item);
        break;
      default:
        throw new Error('must specify "propertyName" attribute on property list component.');
    }
  }
}
