import {
  AlertifyService,
  MessageType,
} from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/common/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Products } from 'src/app/contracts/list_products';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photo',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Products> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerName.BallNewton);
    const products: { totalCount: number; products: List_Products[] } =
      await this.productService.getProduct(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.showSpinner(SpinnerName.BallNewton),
        (errorMessage) =>
          this.alertify.message('Ürünler Listelenmedi', MessageType.Error)
      );
    this.dataSource = new MatTableDataSource<List_Products>(products.products);
    this.paginator.length = products.totalCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
    });
  }

  async pageChange() {
    await this.getProducts();
  }
}
