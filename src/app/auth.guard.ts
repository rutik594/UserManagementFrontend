// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getAuthToken()) {
      // User is authenticated, allow access
      console.log('gurard if')
      return true;
    } else {
      console.log('gurad else')
      // If not authenticated, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
