import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartProduct } from '../../model/product';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from './actions';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  cartProducts$: Observable<CartProduct[] | undefined> = this.store.select(
    selectors.getCartProducts
  );

  total$ = this.store.select(selectors.getCartTotal);

  constructor(
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store<{}>
  ) {
    this.store.dispatch(actions.pageOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(products.map(p => [p.id, p.quantity]))
      // 👇 really important not to forget to subscribe
      .subscribe(isSuccess => {
        if (isSuccess) {
          this.store.dispatch(actions.purchaseSuccess());
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500
          });
        }
      });
  }
}
