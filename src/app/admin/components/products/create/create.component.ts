import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  create(
    name: HTMLInputElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) {
    this.showSpinner(SpinnerName.BallNewton);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseInt(price.value);
    create_product.stock = parseFloat(stock.value);

    this.productService.createProduct(create_product, () => {
      this.showSpinner(SpinnerName.BallNewton);
      this.alertify.message('Eklendi', MessageType.Success);
    });
  }
}
