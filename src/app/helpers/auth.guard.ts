﻿import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanDeactivate,
  NavigationExtras,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ROLE_CLINICIANS, ROLE_PROVIDERS, ROLE_STAFF } from '../shared/constants/config';
import { LOGIN_URL } from '../shared/constants/route-url';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * Activates the service based on current user
   * @returns true if roles is clinicians or staff
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    const currentUser = this.authenticationService.currentUserValue;
    let url: string = state.url;
    localStorage.setItem('redirectUrl', url);
    if (currentUser) {
      for (let roles of currentUser.realm_access.roles) {
        if (roles == ROLE_CLINICIANS || roles == ROLE_STAFF) {  
          return true;
        }
      }
    }
    // not logged in so redirect to login page with the return url
    let navigationExtras: NavigationExtras = {
      queryParams: {
        error: 'Not Authorized',
      },
    };
    this.router.navigate([LOGIN_URL], navigationExtras);
    return false;
  }
}
