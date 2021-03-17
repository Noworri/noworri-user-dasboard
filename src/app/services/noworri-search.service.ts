import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CompanyReference } from './reference-data.interface';

@Injectable({
  providedIn: 'root',
})
export class NoworriSearchService {
  constructor(private http: HttpClient) {}

  getCompanyDetails(phoneNumber: string): Observable<any> {
    const url = 'https://api.noworri.com/api/getcompany/' + phoneNumber;

    return this.http.get(url).pipe(
      map((data: CompanyReference) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }

  getCompanyDetailsByUid(uid: string): Observable<any> {
    const url = 'https://api.noworri.com/api/getcompany/' + uid;

    return this.http.get(url).pipe(
      map((data: CompanyReference) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }

  countSearch(phoneNumber: string) {
    const url = 'https://api.noworri.com/api/countsearch';
    let params = new HttpParams();
    params = params.append('phone_number', phoneNumber);
    return this.http
      .post(url, null, { responseType: 'json', params: params })
      .pipe(
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
