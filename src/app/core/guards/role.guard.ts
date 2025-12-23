import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const roles = route.data?.['roles'] as UserRole[];

  if (!roles || auth.hasRole(roles)) {
    return true;
  }

  return false;
};
