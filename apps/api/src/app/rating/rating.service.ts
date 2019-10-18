import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingService {
  private readonly ratings = new Map<string, number>();

  setRating(id: string, rating: number): Map<string, number> {
    this.ratings.set(id, rating);
    return this.ratings;
  }

  getRating(id: string): number | undefined {
    return this.ratings.get(id);
  }

  getRatings(): Map<string, number> {
    return this.ratings;
  }
}
