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
  const url = "https://api.noworri.com/api/makecardpayment";
  let params = new HttpParams();
  console.log('body.paymentDetails.amount', body.paymentDetails.amount)
  const amount = body.paymentDetails.amount.toString();
  
  params = params.append('amount', amount);

  return this.http.post(url, body, { responseType: 'json', params: params}).pipe(
    map((response) => {
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
