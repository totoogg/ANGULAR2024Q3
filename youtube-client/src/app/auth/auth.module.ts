import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
