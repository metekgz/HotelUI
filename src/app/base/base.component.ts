import { NgxSpinnerService } from 'ngx-spinner';
export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerName: SpinnerName) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  hideSpinner(spinnerNameType: SpinnerName) {
    this.spinner.hide(spinnerNameType);
  }
}
export enum SpinnerName {
  BallNewton = 'ball-newton-cradle',
}
