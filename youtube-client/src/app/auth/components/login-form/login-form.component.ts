import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, CustomButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(private loginService: LoginService) {}

  form = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordUpperLowValidator,
      this.passwordLetterNumberValidator,
      this.passwordSpecialValidator,
    ]),
  });

  passwordUpperLowValidator(
    control: FormControl,
  ): { [s: string]: boolean } | null {
    const upper = String(control.value).toUpperCase() === String(control.value);
    const low = String(control.value).toLowerCase() === String(control.value);

    if (!upper && !low) {
      return null;
    }
    return { passwordUpperLowValidator: true };
  }

  passwordLetterNumberValidator(
    control: FormControl,
  ): { [s: string]: boolean } | null {
    const regexpLetter = /\w+/;
    const regexpNumber = /\d+/;

    if (regexpLetter.test(String(control.value)) && regexpNumber.test(String(control.value))) {
      return null;
    }
    return { passwordLetterNumberValidator: true };
  }

  passwordSpecialValidator(
    control: FormControl,
  ): { [s: string]: boolean } | null {
    const regexp = /!|@|\]|\?|#/gm;

    if (regexp.test(String(control.value))) {
      return null;
    }
    return { passwordSpecialValidator: true };
  }

  handleSubmit() {
    if (this.form.value.login && this.form.value.password) {
      this.loginService.userLogin(
        this.form.value.login,
        this.form.value.password,
      );
    }
  }
}
