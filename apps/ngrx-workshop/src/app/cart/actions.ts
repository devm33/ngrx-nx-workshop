import { createAction, props } from '@ngrx/store';

export const fetchCartItems = createAction('[Cart Effects] fetch items');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: Array<[string, number]> }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');

export const addToCartSuccess = createAction('[Cart API] add product success');

export const addToCartError = createAction(
  '[Cart API] add product error',
  props<{ productId: string }>()
);
