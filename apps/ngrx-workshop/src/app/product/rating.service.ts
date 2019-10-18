import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(private readonly http: HttpClient) {}

  setRating({
    id,
    rating
  }: {
    id: string;
    rating: number;
  }): Observable<Array<[string, number]>> {
    return this.http.post<Array<[string, number]>>(`/api/rating/set/${id}`, {
      rating
    });
  }

  getRatings(): Observable<Array<[string, number]>> {
    return this.http.get<Array<[string, number]>>('/api/rating/get-ratings');
  }

  getRating(id: string): Observable<number | undefined> {
    return this.http.get<number | undefined>(`/api/rating/get/${id}`);
  }
}
