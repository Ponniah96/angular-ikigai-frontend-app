import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('Auth Guard');
  if (!localStorage.getItem('isLoggedIn')) {
    console.log('Not Logged in');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
