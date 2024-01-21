// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PaginationService } from '../pagination.service';

interface UserData {
  userName: string;
  userFirstName: string | undefined;
  userLastName: string | undefined;
  // Add other properties as needed based on the actual response structure
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: UserData[] = [];
  isAdmin = false;
  selectedUser: UserData | undefined;
  isEditFormVisible = false;
  currentPage = 1;
  pageSize = 5;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public paginationService: PaginationService
  ) {}

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'Admin';

    if (this.isAdmin) {
      // Fetch all users if the user is an admin
      this.http.get<UserData[]>('http://localhost:8080/forUser', {
        headers: { Authorization: `Bearer ${this.authService.getAuthToken()}` }
      }).subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error:', error);
          }
        }
      );
    } else {
      // Fetch only the current user's info if the user is not an admin
      const userName = this.authService.getUserFromToken();
      console.log(userName)
      if (userName) {
        this.http.get<UserData>(`http://localhost:8080/forUser/${userName}`, {
          headers: { Authorization: `Bearer ${this.authService.getAuthToken()}` }
        }).subscribe(
          (data) => {
            this.users = [data]; // Place the single user into the array
          },
          (error) => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            } else {
              console.error('Error:', error);
            }
          }
        );
      }
    }
  }



  editUser(user: UserData): void {
    console.log(user);
    this.selectedUser = { ...user }; // Create a copy to avoid modifying the original data
    this.isEditFormVisible = true; // Show the edit form
  }
  
  submitEditForm(): void {
    const userName = this.selectedUser?.userName;
    const editedUser = {
      userFirstName: this.selectedUser?.userFirstName,
      userLastName: this.selectedUser?.userLastName,
    };
console.log(this.selectedUser);
    if (userName) {
      this.http.patch(`http://localhost:8080/forAdmin/edit/${userName}`, editedUser, {
        headers: { Authorization: `Bearer ${this.authService.getAuthToken()}` }
      }).subscribe(
        (response) => {
          console.log('Edit successful:', response);
          // Update the local data with the edited user
        const index = this.users.findIndex(user => user.userName === userName);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...editedUser };
        }

        
          this.isEditFormVisible = false; 
        },
        (error) => {
          console.error('Error editing user:', error);
        }
      );
    }
  }
  cancelEdit(): void {
    this.isEditFormVisible = false; // Cancel the edit and hide the form
  }

  deleteUser(user: UserData): void {
    const userName = user.userName;
console.log(userName)
    this.http.delete(`http://localhost:8080/delete/${userName}`, {
      headers: { Authorization: `Bearer ${this.authService.getAuthToken()}` },
      responseType: 'text' 
    }).subscribe(
      () => {
        console.log(`Delete successful: ${userName}`);

        // Remove the deleted user from the local data
        this.users = this.users.filter(u => u.userName !== userName);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  setPage(page: number): void {
    this.currentPage = page;
   
  }
}
