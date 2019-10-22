import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { Store } from '@ngrx/store';

import * as actions from './actions';
import * as selectors from '../selectors';


@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  product$ = this.store.select(selectors.getCurrentProduct);
  private customerRatingSubject$ = new BehaviorSubject<number | undefined>(
    undefined
  );
  customerRating$: Observable<
    number | undefined
  > = this.customerRatingSubject$.pipe(
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  constructor(
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store<{}>
  ) {
    this.store.dispatch(actions.productDetailsOpened());
    this.subscription.add(
      this.store
        .select(selectors.getCurrentProductId)
        .pipe(
          filter(id => id),
          switchMap(id => this.ratingService.getRating(id))
        )
        .subscribe(rating => this.customerRatingSubject$.next(rating))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRating(id: string, rating: number) {
    this.ratingService
      .setRating({
        id,
        rating
      })
      .pipe(
        map(arr => arr.find(([itemId]) => id === itemId)),
        filter(
          (idRating): idRating is NonNullable<typeof idRating> => !!idRating
        ),
        map(idRating => idRating[1])
      )
      .subscribe(newRating => this.customerRatingSubject$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}
