import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { throws } from 'assert';

@Injectable()
export class CartService {
  private readonly cartProducts = new Map<string, number>();

  addProduct(id: string): Map<string, number> {
    if (Math.random() < 0.25) {
      throw new HttpException('cart failed', HttpStatus.FORBIDDEN);
    }
    const currentQuantity = this.cartProducts.get(id);
    const newQuantity = currentQuantity ? currentQuantity + 1 : 1;
    this.cartProducts.set(id, newQuantity);
    return this.cartProducts;
  }

  removeProduct(id: string): Map<string, number> {
    const currentQuantity = this.cartProducts.get(id);
    if (currentQuantity && currentQuantity > 1) {
      this.cartProducts.set(id, currentQuantity - 1);
    } else {
      this.cartProducts.delete(id);
    }

    return this.cartProducts;
  }

  removeAll(): Map<string, number> {
    this.cartProducts.clear();
    return this.cartProducts;
  }

  getProducts(): Map<string, number> {
    return this.cartProducts;
  }

  purchaseProducts(purchaseItems: Map<string, number>): boolean {
    console.log(purchaseItems.size, this.cartProducts.size);
    if (purchaseItems.size !== this.cartProducts.size) {
      return false;
    }
    for (const [productId, quantity] of purchaseItems.entries()) {
      console.log(
        `${productId} cart: ${this.cartProducts.get(
          productId
        )}, quantity: ${quantity}`
      );
      if (this.cartProducts.get(productId) !== quantity) {
        return false;
      }
    }
    this.removeAll();
    return true;
  }
}
