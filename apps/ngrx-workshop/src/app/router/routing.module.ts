import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartDetailsComponent } from '../cart/cart-details/cart-details.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
import { ProductDetailsModule } from '../product/product-details/product-details.module';
import { ProductListModule } from '../product/product-list/product-list.module';
import { CartDetailsModule } from '../cart/cart-details/cart-details.module';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterSerializer } from './custom-router-serializer';
import { ROUTER_FEATURE_KEY } from './selectors';

const routes: Routes = [
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartDetailsComponent },
  { path: '', component: ProductListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    ProductDetailsModule,
    ProductListModule,
    CartDetailsModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_FEATURE_KEY,
      serializer: CustomRouterSerializer
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
