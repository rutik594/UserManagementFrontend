// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { YourapiserviceService } from '../yourapiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: YourapiserviceService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.registrationService.registerUser(userData)
        .subscribe(response => {
          console.log('Registration successful', response);

          // Check response body for specific message
          if (response.statusCodeValue == 401) {
            this.toastr.error('Username already exists. Please choose a different username.', 'Error');
          } else {
            // Handle other successful registration scenarios
            this.toastr.success('Registered successfully!', 'Success');
            // Reset the form after successful registration
            this.registerForm.reset();
          }
        });
    }
  }
}
