// auth.service.ts
import { Injectable, OnInit } from '@angular/core';
import {  PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService   {
   helper = new JwtHelperService();

 
  token: string | null=null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the code is running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('authToken');
    }
  }

  getUserFromToken(): any {
    const token = localStorage.getItem('authToken'); // Replace with your actual token key
    if (token) {
      return this.decodeJwtToken(token);
    } else {
      return null;
    }
  }

  private decodeJwtToken(token: string): any {
    try {
      const decodedToken = this.helper.decodeToken(token);
      console.log(decodedToken.sub);
      return decodedToken.sub;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
  
 // Check if the user is authenticated (has a valid token)
 isAuthenticated(): boolean {
this.token = localStorage.getItem('authToken');

  // Add additional checks as needed, such as token expiration, etc.
  return !!this.token; // Returns true if token is present, false otherwise
}

// Get the authentication token from local storage
getAuthToken(): string | null {
  const token = localStorage.getItem('authToken');
 // console.log('Token in getAuthToken:', token);
  return token;
}

// Set the authentication token in local storage
setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

// Remove the authentication token from local storage
removeAuthToken(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
 // console.log('remove token',localStorage.getItem('authToken'));
}
}
