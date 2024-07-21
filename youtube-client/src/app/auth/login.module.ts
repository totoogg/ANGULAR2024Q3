import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), LoginFormComponent],
})
export class LoginModule {}
