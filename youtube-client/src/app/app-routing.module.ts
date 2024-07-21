import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { permissionGuard } from './core/guards/permission.guard';
import { loginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'LoginPage',
    canActivate: [loginGuard],
    loadChildren: () => import('./auth/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'main',
    title: 'MainPage',
    canActivate: [permissionGuard],
    loadChildren: () => import('./youtube/main.module').then((m) => m.PagesModule),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
