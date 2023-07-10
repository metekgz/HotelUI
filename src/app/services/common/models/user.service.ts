import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/models/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../user/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as Create_User;
  }

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'users',
          action: 'login',
        },
        { userNameOrEmail, password }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
    // localStorage.setItem('expiration', token.expirationDate.toString());
    this.toastrService.message('Kullanıcı girişi başarılı', '', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight,
    });
    callBackFunction();
  }

  async googleLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'users',
        },
        user
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
    // localStorage.setItem('expiration', token.expirationDate.toString());
    this.toastrService.message('Kullanıcı girişi başarılı', '', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight,
    });
    callBackFunction();
  }
}
