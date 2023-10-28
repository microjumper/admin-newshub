import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

import { AuthService } from "../../services/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router= inject(Router)

  const logged = authService.isLogged();

  if(!logged) {
    router.navigate(['login']).then();
  }

  return logged;
};
