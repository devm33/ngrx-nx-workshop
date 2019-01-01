import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../model/rating';
import { map } from 'rxjs/operators';

function toRating(arr: [string, number][]): Rating[] {
  return arr.map(single => ({
    productId: single[0],
    value: single[1]
  }));
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(private readonly http: HttpClient) {}

  setRating(rating: Rating): Observable<Rating[]> {
    return this.http
      .post<Array<[string, number]>>(`/api/rating/set/${rating.productId}`, {
        rating: rating.value
      })
      .pipe(map(toRating));
  }

  getRatings(): Observable<Rating[]> {
    return this.http
      .get<Array<[string, number]>>('/api/rating/get-ratings')
      .pipe(map(toRating));
  }

  getRating(id: string): Observable<Rating> {
    return this.http
      .get<number | undefined>(`/api/rating/get/${id}`)
      .pipe(map(value => ({ productId: id, value })));
  }
}
