import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userService: UserService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {}

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerName.BallNewton);
    await this.userService.login(userNameOrEmail, password, () =>
      this.hideSpinner(SpinnerName.BallNewton)
    );
  }
}
