import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private readonly http: HttpClient) {}

  addProduct(id: string): Observable<Array<[string, number]>> {
    return this.http.post<Array<[string, number]>>(`/api/cart/add/${id}`, {});
  }

  removeProduct(id: string): Observable<Array<[string, number]>> {
    return this.http.post<Array<[string, number]>>(
      `/api/cart/remove/${id}`,
      {}
    );
  }

  removeAll(): Observable<Array<[string, number]>> {
    return this.http.post<Array<[string, number]>>(`/api/cart/clear`, {});
  }

  getCartProducts(): Observable<Array<[string, number]>> {
    return this.http.get<Array<[string, number]>>(`/api/cart/cart-content`);
  }

  purchase(purchaseItems: Array<[string, number]>): Observable<boolean> {
    return this.http.post<boolean>(`/api/cart/purchase`, purchaseItems);
  }
}
