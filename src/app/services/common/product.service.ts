import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService, RequestParameters } from './http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Products } from 'src/app/contracts/list_products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(
    product: Create_Product,
    successCallBack: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, product).subscribe(
      (result) => {
        successCallBack();
      },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v} <br>`;
          });
        });
        errorCallBack(message);
      }
    );
  }

  async getProduct(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalCount:number,products:List_Products[]}> {
    const data: Promise<{totalCount:number,products:List_Products[]}> = this.httpClientService
      .get<{totalCount:number,products:List_Products[]}>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();
    data
      .then((d) => successCallBack())
      .catch((error: HttpErrorResponse) => errorCallBack(error.message));
    return await data;
  }
}
