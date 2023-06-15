import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService, RequestParameters } from './http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(product: Create_Product, successCallBack?: any) {
    this.httpClientService
      .post({ controller: 'products' }, product)
      .subscribe((result) => {
        successCallBack();
      });
  }
}
