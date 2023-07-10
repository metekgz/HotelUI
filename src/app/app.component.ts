import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/user/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HotelUI';

  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.toastrService.message('Çıkış Yapıldı', '', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight,
    });
    this.router.navigate(['']);
  }
}
