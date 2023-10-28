import { Component } from '@angular/core';

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginWithMicrosoft().subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => console.log(error)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
