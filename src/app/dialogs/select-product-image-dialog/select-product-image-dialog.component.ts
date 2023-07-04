import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  images: List_Product_Image[];

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService
  ) {
    super(dialogRef);
  }

  async ngOnInit() {
    this.images = await this.productService.readImages(this.data as string);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png , .jpg , .jpeg .gif',
    action: 'upload',
    controller: 'products',
    explanation: 'Ürün resmini seçin veya sürükleyin',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };

  async deleteImage(imageId: string) {
    await this.productService.deleteImage(this.data as string, imageId);
  }
}
export enum SelectProductImageState {
  Close,
}
