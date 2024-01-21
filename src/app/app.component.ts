import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: string | null = null;
  showHomeLink: boolean = false;
  isLoginPage: boolean = false;
  constructor(private authService: AuthService, private router: Router,private location: Location) {

    this.isLoginPage = this.location.path() === '/login';
    console.log(this.isLoginPage)
  }

  ngOnInit(): void {
    // Check if the authToken is present
    this.showHomeLink = this.authService.isAuthenticated();
    console.log(this.location.path())
 
   
    this.isLoginPage = this.location.path() === '/login';
    console.log('loginpage',this.isLoginPage)
console.log('token there or not',this.showHomeLink);

this.router.events
.pipe(filter(event => event instanceof NavigationEnd))
.subscribe(() => {
  // Update properties based on the current route
  this.showHomeLink = this.authService.isAuthenticated();
  this.isLoginPage = this.location.path() === '/login';
  console.log('loginpage',this.isLoginPage)
  console.log('token there or not',this.showHomeLink);
  
});
  }

  

  logout(): void {
    // Clear authentication token from localStorage
    this.authService.removeAuthToken();
    this.showHomeLink = this.authService.isAuthenticated();
   
    // Redirect to the login page
    this.router.navigate(['/login']);
    console.log('between home page and login page')
   this.isLoginPage = this.location.path() === '/login';
  }
}
