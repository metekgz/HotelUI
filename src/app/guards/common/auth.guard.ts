import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/user/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!_isAuthenticated) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastrService.message(
        'İlgili sayfaya gitmek için Giriş yapmanız gerekir',
        '',
        {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomRight,
        }
      );
    }

    return true;
  }
}
