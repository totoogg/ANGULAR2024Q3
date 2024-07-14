import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';

export const permissionGuard: CanActivateFn = () => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (!authService.stor) {
    return router.createUrlTree(['/login']);
  }
  return !!authService.stor;
};
