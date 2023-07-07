import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/user/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  createUser: Create_User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: CustomToastrService
  ) {}

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let confirmPassword = group.get('confirmPassword').value;
          return password == confirmPassword ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid) return;
    this.createUser = await this.userService.create(user);
    if (this.createUser.succeeded)
      this.toastService.message(
        this.createUser.message,
        'Kullanıcı Kaydı Oluşturuldu',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomRight,
        }
      );
    else
      this.toastService.message(
        this.createUser.message,
        'Kullanıcı Kaydı Oluşturulamadı',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomRight,
        }
      );
  }
}
