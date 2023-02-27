import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDataService {
  private _cast = new BehaviorSubject<string[]>([]);
  private _genre = new BehaviorSubject<string[]>([]);

  getCast() {
    return this._cast.asObservable();
  }

  getGenre() {
    return this._genre.asObservable();
  }

  addCast(castMember: string) {
    const cast = this._cast.value;
    cast.push(castMember);
    this._cast.next(cast);
  }

  deleteCast(castMember: string) {
    const cast = this._cast.value;
    const index = cast.findIndex(c => c === castMember);
    cast.splice(index, 1);
    this._cast.next(cast);
    console.log(cast);
  }
  deleteAllCast() {
    this._cast.next([]);
  }

  addGenre(genre: string) {
    const genres = this._genre.value;
    genres.push(genre);
    this._genre.next(genres);
  }

  deleteGenre(genre: string) {
    const genres = this._genre.value;
    const index = genres.findIndex(c => c === genre);
    genres.splice(index, 1);
    this._genre.next(genres);
    console.log(genres);
  }

  deleteAllGenre() {
    this._genre.next([]);
  }
}
