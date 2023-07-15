import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_HotelRoom } from 'src/app/contracts/create_hotelRoom';
import {
  AlertifyService,
  MessageType,
} from 'src/app/services/admin/alertify.service';
import { HotelRoomService } from 'src/app/services/common/hotelRoom.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private hotelRoomService: HotelRoomService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<Create_HotelRoom> = new EventEmitter();

  create(
    name: HTMLInputElement,
    price: HTMLInputElement,
    desc: HTMLInputElement
  ) {
    debugger
    this.showSpinner(SpinnerName.BallNewton);
    const create_hotelroom: Create_HotelRoom = new Create_HotelRoom();
    create_hotelroom.roomname = name.value;
    create_hotelroom.price = parseInt(price.value);
    create_hotelroom.description = desc.value;

    this.hotelRoomService.createHotelRoom(
      create_hotelroom,
      () => {
        this.showSpinner(SpinnerName.BallNewton);
        this.alertify.message('Eklendi', MessageType.Success);
        this.createdProduct.emit(create_hotelroom);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, MessageType.Error);
      }
    );
  }
}
