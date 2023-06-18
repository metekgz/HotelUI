import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    public dialog: MatDialog
  ) {
    const icon = _renderer.createElement('mat-icon');
    icon.setAttribute('fontIcon', 'delete');
    icon.setAttribute('aria-hidden', 'false');
    icon.setAttribute('aria-label', 'Delete Button');
    icon.setAttribute('style', 'cursor:pointer;');
    icon.setAttribute(
      'class',
      'mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color'
    );
    icon.setAttribute('ng-reflect-font-icon', 'delete');
    icon.setAttribute('data-mat-icon-type', 'font');
    icon.setAttribute('data-mat-icon-name', 'delete');
    _renderer.appendChild(element.nativeElement, icon);
  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.productService.delete(this.id);
      $(td.parentElement).fadeOut(200, () => {
        this.callback.emit();
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width:'250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
