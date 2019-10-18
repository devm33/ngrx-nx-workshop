import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct } from '@ngrx-nx-workshop/api-interfaces';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[]>;
  customerRatings$?: Observable<Map<string, number>>;

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();

    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map(arr => new Map(arr)),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  }
}
