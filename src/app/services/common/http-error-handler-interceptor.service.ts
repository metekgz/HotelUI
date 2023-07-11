import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../user/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: CustomToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message('Yetkiniz Bulunmamaktadır', '', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomRight,
            });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message('Sunucuya Erişilmiyor', '', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomRight,
            });
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message('Geçersiz İstek', '', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomRight,
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message('Sayfa Bulunamadı', '', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomRight,
            });
            break;
          default:
            this.toastrService.message('Beklenmeyen Hata', '', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomRight,
            });
            break;
        }
        return of(error);
      })
    );
  }
}
