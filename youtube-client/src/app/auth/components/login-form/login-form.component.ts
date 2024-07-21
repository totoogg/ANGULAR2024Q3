import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(private loginService: LoginService) {}

  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    if (this.form.value.login && this.form.value.password) {
      this.loginService.userLogin(
        this.form.value.login,
        this.form.value.password,
      );
    }
  }
}
