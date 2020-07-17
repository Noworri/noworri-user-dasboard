import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TransactionsReference } from './reference-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

constructor(private http: HttpClient) { }

getUserTranactions(userId: string): Observable<any> {
  const url = "https://api.noworri.com/api/usertransactions/" + userId;

  return this.http.get(url).pipe(
    map((data: TransactionsReference[]) => {
      data.map(values => {
        if (typeof values.total_price === undefined) {
          values.total_price = values.price;
        }
        values.state = values.etat == 1 ? 'Completed' : 'pending';
        return values;
      })

      return data;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}
processPayment(body): Observable<any> {
  const url = "https://developer.ecobank.com/corporateapi/merchant/card";

  let header = new HttpHeaders();
  header.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpYW1hdW5pZmllZGRldjEwMyIsImV4cCI6MTU5NDc1NjQyMSwiaWF0IjoxNTk0NzQ5MjIxLCJpc3MiOiJjb20uZWNvYmFuay5jb3Jwb3JhdGVhcGkiLCJqdGkiOiJmNDM4NTYwNi1jNWZhLTExZWEtYmY3Ny1hNWQ2OTJiYTgwMmIifQ.EZrQQpVbIoZtILUZBUwJpiY4DtnOlxAdjsYOoLFRe-fmO-t2VGah8J4CJ9qsPh89T_4avxSdBjuN2BALp0utfmZ0-dNXD6bbNNSrcRx99eR0Ge-DwLLqOUEqwXh2TXj0nQj6WY-YQqN4dUHQTaC32VQGoATDmIFflsABz2PFY4765sQ9GIiruv0Tvp07W9q_40JLi2U7gpniuSevppHcyiBsOocG2gZd4m747e72HHSAnCv7EVLX26l20_QWPF39TtWjGRpUqLqiy_06iHmfcGb-Ro9faNHYP4FrjS8wS8mH9D12dqaBWTOjQvD44us8C5P-App-ZKqL-KHNNAQj9w");
  header.append("Content-Type", "application/json");
  header.append("Accept", "application/json");
  header.append("Origin", "developer.ecobank.com");
  header.append("Referer", "api.noworri.com");

  return this.http.post(url, body, { headers: header }).pipe(
    map((response) => {
      console.log("response", response);
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

createTransaction(tranactionDetails) {
  const url = "https://api.noworri.com/api/matchtransactionupload";
  let params = new HttpParams();
  
  params = params.append('user_id', tranactionDetails.uer_id);
  params = params.append('user_role', tranactionDetails.user_role);
  params = params.append('user_phone', tranactionDetails.user_phone);
  params = params.append('owner_id', tranactionDetails.owner_id);
  params = params.append('owner_role', tranactionDetails.owner_role);
  params = params.append('owner_phone', tranactionDetails.owner_phone);
  params = params.append('transaction_type', tranactionDetails.transaction_type);
  params = params.append('service', tranactionDetails.service);
  params = params.append('price', tranactionDetails.price);
  params = params.append('noworri_fees', tranactionDetails.noworri_fees);
  params = params.append('requirement', tranactionDetails.requirement);

  return this.http.post(url, tranactionDetails, { responseType: 'json', params: params}).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

}
