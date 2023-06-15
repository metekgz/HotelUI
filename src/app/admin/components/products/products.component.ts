import { HttpClientService } from './../../../services/common/http-client.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerName.BallNewton);

    this.httpClientService
      .get<Create_Product[]>({ controller: 'products' })
      .subscribe((data) => console.log(data));

    // this.httpClientService
    //   .post({ controller: 'products' }, { name: 'Mause', stock: 62, price: 142 })
    //   .subscribe();

    // this.httpClientService
    //   .put(
    //     { controller: 'products' },
    //     {
    //       id: '8a24fae8-12a2-4a7d-02d1-08db6d0ea93b',
    //       name: 'Klavye',
    //       stock: '44',
    //       price: 58,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .delete(
    //     { controller: 'products' },
    //     '8a88bf93-26ba-4b6a-02d5-08db6d0ea93b'
    //   )
    //   .subscribe();
  }
}
