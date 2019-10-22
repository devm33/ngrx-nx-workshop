import { Injectable, ApplicationRef } from "@angular/core";
import { ProductService } from './product.service';
import { Actions,createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as productDetailsActions from './product-details/actions';
import * as productListActions from './product-list/actions';
import * as cartDetailsActions from '../cart/cart-details/actions';
import * as apiActions from './actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as selectors from './selectors';
import * as actions from './actions';


@Injectable()
export class ProductEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly productService: ProductService,
        private readonly snackBar: MatSnackBar,
        private readonly appRef: ApplicationRef,
        private readonly store: Store<{}>
    ) {}


    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productListActions.productsOpened, cartDetailsActions.pageOpened),
            exhaustMap(() =>
                this.productService.getProducts().pipe(
                    map(products => apiActions.productsFetchedSuccess({ products })),
                    catchError(() => of(apiActions.productsFetchedError()))
                )
            )
        )
    );

    handleFetchError$ = createEffect(
        () => this.actions$.pipe(
            ofType(apiActions.productsFetchedError),
            tap(() => {
                this.snackBar.open('Error fetching products', 'Error', {
                    duration: 2500
                });
                this.appRef.tick();
            })),
        { dispatch: false }
    );

    fetchCurrentProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productDetailsActions.productDetailsOpened),
            withLatestFrom(this.store.select(selectors.getCurrentProductId)),
            switchMap(([, id]) =>
                this.productService.getProduct(id).pipe(
                    map(product => actions.productFetchedSuccess({ product })),
                    catchError(() => of(actions.productFetchedError()))
                )
            )
        )
    );

    handleFetchProductError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(apiActions.productFetchedError),
                tap(() => {
                    this.snackBar.open('Error fetching product', 'Error', {
                        duration: 2500
                    });
                    // This is needed to trigger change detection. The other option would
                    // be to wrap `open` call with setTimeout or Promise.resolve.
                    this.appRef.tick();
                })
            ),
        { dispatch: false }
    );
}