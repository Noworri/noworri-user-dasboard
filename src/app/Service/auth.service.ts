import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(phoneNumber, password): Observable<any> {
    const url = 'https://api.noworri.com/api/login';
    const body = {
      mobile_phone: phoneNumber,
      password: password,
    };

    return this.http.post(url, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }

  getUserDetails(phoneNumber): Observable<any> {
    const url = 'https://api.noworri.com/api/getuserbyphone';
    let params = new HttpParams();
    params = params.append('user_phone', phoneNumber);

    return this.http.post(url, null, { responseType: 'json', params: params}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }
}
