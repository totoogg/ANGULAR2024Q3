import { NgIf, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ReactiveFormsModule, FormGroup, FormControl, Validators,
} from '@angular/forms';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  constructor(private loginService: LoginService) {}

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    img: new FormControl('', [
      Validators.required,
    ]),
    link: new FormControl('', [
      Validators.required,
    ]),
    createDate: new FormControl('', [
      Validators.required,
    ]),
    tags: new FormControl('', [
      Validators.required,
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

  handleSubmit() {
    /* if (this.form.value.login && this.form.value.password) {
      this.loginService.userLogin(
        this.form.value.login,
        this.form.value.password,
      );
    } */
  }
}
