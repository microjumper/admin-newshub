import { Component } from '@angular/core';

import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { ToastService } from "../../services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {}

  login() {
    this.authService.loginWithMicrosoft().subscribe({
        next: (result) => {
          this.toastService.showSuccess('Login completed successfully');
          this.router.navigate(['/']).then();
        },
        error: (error) => console.log(error)
    });
  }
}
