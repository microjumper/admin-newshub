import { Injectable } from '@angular/core';

import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";

import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msalService: MsalService) {
    this.msalService.initialize().subscribe()
  }

  isLogged(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }

  getActiveAccountName(): string | undefined {
    return this.msalService.instance.getActiveAccount()?.username
  }

  loginWithMicrosoft(): Observable<AuthenticationResult> {
    return this.msalService.loginPopup().pipe(
      tap(response => this.msalService.instance.setActiveAccount(response.account))
    );
  }

  logout() {
    this.msalService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }
}
