import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), LoginFormComponent],
})
export class LoginModule {}
