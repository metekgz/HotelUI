import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { List_HotelRooms } from 'src/app/contracts/list_hotelRooms';
import { List_Products } from 'src/app/contracts/list_products';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HotelRoomService } from 'src/app/services/common/hotelRoom.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'roomname',
    'description',
    'price',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_HotelRooms> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private hotelRoomService: HotelRoomService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  ngOnInit() {
    this.getRooms();
    this.pageChange();
  }

  async getRooms() {
    this.showSpinner(SpinnerName.BallNewton);
    const hotelRooms: { totalCount: number; hotelRooms: List_HotelRooms[] } =
      await this.hotelRoomService.getHotelRoom(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.showSpinner(SpinnerName.BallNewton),
        (errorMessage) =>
          this.alertify.message('Odalar Listelenmedi', MessageType.Error)
      );
    this.dataSource = new MatTableDataSource<List_HotelRooms>(hotelRooms.hotelRooms);
    this.paginator.length = hotelRooms.totalCount;
  }




  async pageChange() {
    await this.getRooms();
  }
}

