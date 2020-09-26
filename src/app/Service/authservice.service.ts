import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
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

  register(userData): Observable<any> {
    const url = 'hhtps/api.noworri.com/api/register';
    let params = new HttpParams();
    params = params.append('user_uid', userData.uid);
    params = params.append('email', userData.email);
    params = params.append('name', userData.lastName);
    params = params.append('first_name', userData.firstName);
    params = params.append('mobile_phone', userData.mobile);
    params = params.append('user_name', userData.userName);
    params = params.append('country', userData.country);
    params = params.append('photo', userData.photo);
    params = params.append('buyer', userData.isBuyer);
    params = params.append('seller', userData.isSeller);
    params = params.append('type', userData.type);
    params = params.append('account', userData.account);
    params = params.append('password', userData.password);
    params = params.append('code', userData.code);
    return this.http.post(url, null, { responseType: 'json',  params: params}).pipe(
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
