import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../auth/services/login.service';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.stor) {
    return router.createUrlTree(['/main']);
  }
  return !authService.stor;
};
