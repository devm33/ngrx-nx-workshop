import { Injectable, ApplicationRef } from "@angular/core";
import { ProductService } from './product.service';
import { Actions,createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import * as productListActions from './product-list/actions';
import * as apiActions from './actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ProductEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly productService: ProductService,
        private readonly snackBar: MatSnackBar,
        private readonly appRef: ApplicationRef
    ) {}


    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productListActions.productsOpened),
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
}