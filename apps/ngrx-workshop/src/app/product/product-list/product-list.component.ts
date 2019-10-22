import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct } from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { productsOpened } from './actions';
import * as selectors from '../selectors';
import { GlobalState } from '../reducer';
import { CallState, LoadingState } from '../../shared/call_state';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<BasicProduct[] | undefined> = this.store.select(selectors.getProducts);
  customerRatings$?: Observable<Map<string, number>>;
  productsCallState$: Observable<CallState> = this.store.select(
    selectors.getProductsCallState
  );

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly store: Store<GlobalState>,
    private readonly ratingService: RatingService
  ) {
    this.store.dispatch(productsOpened());
  }

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map(arr => new Map(arr)),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  }
}
