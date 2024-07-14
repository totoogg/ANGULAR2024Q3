import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = 'Your Name';

  stor: string | null;

  constructor(private router: Router) {
    this.stor = localStorage.getItem('token-ANGULAR2024Q3');
    this.repeatedLoginUser();
  }

  userLogout() {
    this.stor = null;
    this.user = 'Your Name';
    localStorage.removeItem('token-ANGULAR2024Q3');
    this.router.navigate(['login']);
  }

  repeatedLoginUser() {
    if (this.stor) {
      const result = this.decoder(JSON.parse(this.stor));

      this.userName(result.login);
    }
  }

  userLogin(login: string, password: string) {
    this.userName(login);

    const result = this.encode(`${login}|token|${password}`);

    this.stor = JSON.stringify(result);

    localStorage.setItem('token-ANGULAR2024Q3', JSON.stringify(result));

    this.router.navigate(['main']);
  }

  userName(login: string) {
    this.user = login;
  }

  encode(str: string): string {
    return str
      .split('')
      .map((el) => el.codePointAt(0))
      .join('|');
  }

  decoder(str: string): IUser {
    const decoderStr = str
      .split('|')
      .map((el) => String.fromCodePoint(Number(el)))
      .join('');

    const res = decoderStr.split('|token|');

    return { login: res[0], password: res[1] };
  }
}
