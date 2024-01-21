// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { YourapiserviceService } from './yourapiservice.service';
import { MatButtonModule } from '@angular/material/button'; // Import the MatButton module
import { MatInputModule } from '@angular/material/input'; // Import the MatInputModule
import { MatTooltipModule } from '@angular/material/tooltip'; // Import the MatTooltipModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule, // Add BrowserAnimationsModule
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/register', pathMatch: 'full' },
    ])
  ],
  providers: [AuthGuard, AuthService,YourapiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
