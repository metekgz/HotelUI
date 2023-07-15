import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_HotelRooms } from 'src/app/contracts/list_hotelRooms';
import { HotelRoomService } from 'src/app/services/common/hotelRoom.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  hotelRooms: List_HotelRooms[];
  currentPageNo: number;
  totalCount: number;
  totalPageCount: number;
  pageSize: number = 8;
  pageList: number[] = [];

  constructor(
    private hotelRoomService: HotelRoomService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllHotelRooms();
  }

  getAllHotelRooms() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data: { totalCount: number; hotelRooms: List_HotelRooms[] } =
        await this.hotelRoomService.getHotelRoom(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );
      this.hotelRooms = data.hotelRooms;
      this.totalCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.pageList = [];
      if (this.totalPageCount >= 7) {
        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++) {
            this.pageList.push(i);
          }
        } else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            this.pageList.push(i);
          }
        } else {
          for (
            let i = this.currentPageNo - 3;
            i <= this.currentPageNo + 3;
            i++
          ) {
            this.pageList.push(i);
          }
        }
      } else {
        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }
    });
  }
}
