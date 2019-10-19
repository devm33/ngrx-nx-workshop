import { createAction, props } from '@ngrx/store';

export const fetchCartItems = createAction('[Cart Effects] fetch items');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: Array<[string, number]> }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');
