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
export class ProductDetailsComponent {
  product$ = this.store.select(selectors.getCurrentProduct);
  customerRating$: Observable<number | undefined> = this.store.select(
    selectors.getCurrentProductRating
  );

  constructor(
    private readonly location: Location,
    private readonly store: Store<{}>
  ) {
    this.store.dispatch(actions.productDetailsOpened());
  }

  setRating(id: string, rating: number) {
    this.store.dispatch(actions.rateProduct({ productId: id, value: rating }));
  }

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}
