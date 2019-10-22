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

export const removeFromCartSuccess = createAction(
  '[Cart API] remove product success'
);

export const removeFromCartError = createAction(
  '[Cart API] remove product error',
  props<{ productId: string }>()
);

export const removeAllFromCartSuccess = createAction(
  '[Cart API] remove all products success'
);

export const removeAllFromCartError = createAction(
  '[Cart API] remove all products error',
  props<{ cartItems: Array<[string, number]> }>()
);

export const purchaseSuccess = createAction('[Cart API] purchase success');

export const purchaseError = createAction('[Cart API] purchase error');