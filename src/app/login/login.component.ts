// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isFormSubmitted = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private zone: NgZone
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  login() {
    this.isFormSubmitted = true;
    this.loginError = null; // Reset login error

    if (this.loginForm.valid) {
      const apiEndpoint = 'http://localhost:8080/authenticate';
      const credentials = this.loginForm.value;

      this.http.post<any>(apiEndpoint, credentials)
        .subscribe(response => {
          console.log('Login successful');
          // Call the authenticate method in the AuthService
          this.authService.setAuthToken(response.jwtToken);
          if (response.user.roleType == 1) {
            localStorage.setItem('userRole', 'User');
          } else {
            localStorage.setItem('userRole', 'Admin');
          }
       
          

          // Redirect to the home page
          this.router.navigate(['/home']);
        }, error => {
          console.error('Login failed', error.ok);

          if(!error.ok) {
            // Unauthorized (username or password is incorrect)
            this.loginError = error.error;
            console.log(this.loginError)
           } else {
             // Other errors
             this.loginError = 'An error occurred. Please try again later.';
           }
         
        });
    }
  }
}
