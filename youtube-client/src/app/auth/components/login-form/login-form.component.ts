import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {
  passwordLetterNumberValidator,
  passwordSpecialValidator,
  passwordUpperLowValidator,
} from '../../../shared/validators/passwordValidators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(private loginService: LoginService) {}

  form = new FormGroup(
    {
      login: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: [
        passwordUpperLowValidator,
        passwordLetterNumberValidator,
        passwordSpecialValidator,
      ],
    },
  );

  errorsMessage() {
    const errors = [
      {
        errorValid: 'required',
        message: 'Please enter a password',
      },
      {
        errorValid: 'minlength',
        message: "Your password isn't strong enough at least 8 characters",
      },
      {
        errorValid: 'passwordUpperLowValidator',
        message:
          "Your password isn't strong enough a mixture of both uppercase and lowercase letters",
      },
      {
        errorValid: 'passwordLetterNumberValidator',
        message:
          "Your password isn't strong enough a mixture of letters and numbers",
      },
      {
        errorValid: 'passwordSpecialValidator',
        message:
          "Your password isn't strong enough inclusion of at least one special character, e.g., ! &#64; # ? ]",
      },
    ];

    const currentErrors = Object.keys((this.form.errors as object) || {});

    return errors.filter((el) => currentErrors.includes(el.errorValid));
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
