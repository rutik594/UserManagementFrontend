import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YourapiserviceService {

  
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    const apiEndpoint = `${this.apiUrl}/registerNewUser`;

    return this.http.post(apiEndpoint, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error for debugging purposes
    console.error('Full error response:', error);

    // Re-throw the error to propagate it to the subscriber
    return throwError(() => error);
  }
}
