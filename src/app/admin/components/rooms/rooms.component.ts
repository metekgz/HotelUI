import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_HotelRoom } from 'src/app/contracts/create_hotelRoom';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerName.BallNewton);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdRooms(createdRooms:Create_HotelRoom){
    this.listComponents.getRooms();
  }
}
