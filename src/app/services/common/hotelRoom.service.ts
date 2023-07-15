import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_HotelRoom } from 'src/app/contracts/create_hotelRoom';
import { List_HotelRooms } from 'src/app/contracts/list_hotelRooms';

@Injectable({
  providedIn: 'root',
})
export class HotelRoomService {
  constructor(private httpClientService: HttpClientService) {}

  createHotelRoom(
    hotelRoom: Create_HotelRoom,
    successCallBack: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({ controller: 'hotelrooms' }, hotelRoom).subscribe(
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

  async getHotelRoom(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; hotelRooms: List_HotelRooms[] }> {
    const data: Promise<{ totalCount: number; hotelRooms: List_HotelRooms[] }> =
      this.httpClientService
        .get<{ totalCount: number; hotelRooms: List_HotelRooms[] }>({
          controller: 'hotelrooms',
          queryString: `page=${page}&size=${size}`,
        })
        .toPromise();
    data
      .then((d) => successCallBack())
      .catch((error: HttpErrorResponse) => errorCallBack(error.message));
    return await data;
  }

  async delete(id: string) {
    const del: Observable<any> = this.httpClientService.delete<any>(
      {
        controller: 'hotelrooms',
      },
      id
    );
    await firstValueFrom(del);
  }
}
