import { CART_FEATURE_KEY, CartState } from './reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getProducts } from '../product/selectors';
import { CartProduct } from '../model/product';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const getCartItems = createSelector(
  cartFeature,
  state => (state.cartItems ? Object.entries(state.cartItems) : undefined)
);

export const getCartItemsCount = createSelector(
  getCartItems,
  cartItems =>
    cartItems ? cartItems.reduce((acc, [, quantity]) => acc + quantity, 0) : 0);


export const getCartProducts = createSelector(
  getCartItems,
  getProducts,
  (cartItems, products) => {
    if (!cartItems  || !products) return undefined;
    return cartItems
      .map(([id, quantity]): CartProduct | undefined => {
        const product = products.find(p => p.id === id);
        if (!product) return undefined;
        return {
          ...product,
          quantity
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
  }
);

export const getCartTotal = createSelector(
  getCartProducts,
  cartProducts =>
    cartProducts &&
    cartProducts.reduce((total, { price, quantity }) => total + price * quantity, 0)
);