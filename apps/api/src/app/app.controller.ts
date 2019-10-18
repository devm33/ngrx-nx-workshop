import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Body
} from '@nestjs/common';

import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';

import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { DelayInterceptor } from './delay.interceptor';
import { RatingService } from './rating/rating.service';

@UseInterceptors(DelayInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly ratingService: RatingService
  ) {}

  @Get('product/product-list')
  getProductList(): BasicProduct[] {
    return this.productService.getProductList();
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string): Product {
    return this.productService.getProduct(id);
  }

  @Post('cart/add/:id')
  addProduct(@Param('id') id: string): Array<[string, number]> {
    return Array.from(this.cartService.addProduct(id).entries());
  }

  @Post('cart/remove/:id')
  removeProduct(@Param('id') id: string): Array<[string, number]> {
    return Array.from(this.cartService.removeProduct(id).entries());
  }

  @Post('cart/clear')
  clearProducts(): Array<[string, number]> {
    return Array.from(this.cartService.removeAll().entries());
  }

  @Get('cart/cart-content')
  getCartProducts(): Array<[string, number]> {
    return Array.from(this.cartService.getProducts().entries());
  }

  @Post('cart/purchase')
  purchaseProducts(@Body() purchaseItems: Array<[string, number]>): boolean {
    return this.cartService.purchaseProducts(
      new Map<string, number>(purchaseItems)
    );
  }

  @Post('rating/set/:id')
  setRating(
    @Param('id') id: string,
    @Body() { rating }: { rating: number }
  ): Array<[string, number]> {
    return Array.from(this.ratingService.setRating(id, rating).entries());
  }

  @Get('rating/get/:id')
  getRating(@Param('id') id: string): number | undefined {
    return this.ratingService.getRating(id);
  }

  @Get('rating/get-ratings')
  getRatings(): Array<[string, number]> {
    return Array.from(this.ratingService.getRatings().entries());
  }
}
