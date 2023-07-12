import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { SignalRService } from 'src/app/services/common/signalr.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/user/custom-toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private signalRService: SignalRService,
    private toastrService: CustomToastrService
  ) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(
      ReceiveFunctions.ProductAddedMessageReceiveFunction,
      (message) =>
        this.toastrService.message(message, '', {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomRight,
        })
    );
    this.showSpinner(SpinnerName.BallNewton);
  }
}
