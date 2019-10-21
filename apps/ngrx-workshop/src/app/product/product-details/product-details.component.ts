import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { Store } from '@ngrx/store';

import * as actions from './actions';


@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  private readonly productId$ = this.router.paramMap.pipe(
    map((params: ParamMap) => params.get('productId')),
    filter((id: string | null): id is string => !!id),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  product$ = this.productId$.pipe(
    switchMap(id => this.productService.getProduct(id))
  );

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
    private readonly router: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly cartService: CartService,
    private readonly location: Location,
    private readonly store: Store<{}>
  ) {
    this.productId$
      .pipe(switchMap(id => this.ratingService.getRating(id)))
      .subscribe(rating => this.customerRatingSubject$.next(rating));
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
