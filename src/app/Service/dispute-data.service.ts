import { Injectable } from '@angular/core';
import { DisputeReference } from './reference-data.interface';
import { Observable, throwError as observableThrowError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisputeDataService {

constructor(private http: HttpClient) { }

openDistpute(data): Observable<DisputeReference> {
  const url = "https://api.noworri.com/api/createdispute" ;
  return this.http.post(url, data).pipe(
    map((response: DisputeReference) => {
      const dipute = response;
      return dipute;
    }),
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );}
}
