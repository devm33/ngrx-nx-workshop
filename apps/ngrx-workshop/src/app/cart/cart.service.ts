import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject$ = new BehaviorSubject<Array<[string, number]>>([]);
  cartItems$ = this.cartItemsSubject$.pipe(
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  constructor(private readonly http: HttpClient) {}

  addProduct(id: string): Observable<Array<[string, number]>> {
    return this.http.post<Array<[string, number]>>(`/api/cart/add/${id}`, {});
  }

  removeProduct(id: string): void {
    this.http
      .post<Array<[string, number]>>(`/api/cart/remove/${id}`, {})
      .subscribe(arr => this.cartItemsSubject$.next(arr));
  }

  removeAll(): void {
    this.http
      .post<Array<[string, number]>>(`/api/cart/clear`, {})
      .subscribe(arr => this.cartItemsSubject$.next(arr));
  }

  getCartProducts(): Observable<Array<[string, number]>> {
    return this.http.get<Array<[string, number]>>(`/api/cart/cart-content`);
  }

  purchase(purchaseItems: Array<[string, number]>): Observable<boolean> {
    return this.http.post<boolean>(`/api/cart/purchase`, purchaseItems);
  }
}
