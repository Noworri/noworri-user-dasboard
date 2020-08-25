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

getUserTransactions(userId: string): Observable<any> {
  const url = 'https://api.noworri.com/api/usertransactions/' + userId;

  return this.http.get(url).pipe(
    map((data: TransactionsReference[]) => {
      data.map(values => {
        if (typeof values.total_price === undefined) {
          values.total_price = values.price;
        }
        if ( values.etat === '0') {
          values.state = 'Cancelled';
        } else if (values.etat === '1') {
          values.state = 'Pending';
        } else {
          values.state = 'Completed';
        }
        return values;
      });

      return data;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}

getUserTransaction(transaction_id: string): Observable<any> {
  const url = 'https://api.noworri.com/api/getusertransaction/' + transaction_id;

  return this.http.get(url).pipe(
    map((data: TransactionsReference[]) => {
      data.map(transaction => {
        if (typeof transaction.total_price === undefined) {
          transaction.total_price = transaction.price;
        }
        return transaction;
      });
      return data;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}
processPayment(body): Observable<any> {
  const url = 'https://api.noworri.com/api/makecardpayment';
  let params = new HttpParams();
  const amount = body.paymentDetails.amount.toString();

  params = params.append('amount', amount);
// , { responseType: 'json', params: params}
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

releaseFunds(transaction_id) {
  const url = `https://api.noworri.com/api/releasepayment/${transaction_id}`;
  return this.http.post(url, null).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}

cancelOrder(transaction_id) {
  const url = `https://api.noworri.com/api/cancelTransaction/${transaction_id}`;
  return this.http.post(url, null).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}

updateDeliveryPhone(transaction_id, delivery_phone) {
  const url = `https://api.noworri.com/api/updateecobankescrdevivery`;
  let params = new HttpParams();
  params = params.append('deliver', delivery_phone);
  params = params.append('id', transaction_id);

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

makeMomoPayment() {
  const url = 'https://api.noworri.com/api/paywithmomo';
  return this.http.post(url, null).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error', error.message);
      return observableThrowError(error);
    })
  );
}

createTransaction(tranactionDetails) {
  const url = 'https://api.noworri.com/api/createusertransaction';
  let params = new HttpParams();

  params = params.append('user_id', tranactionDetails.uer_id);
  params = params.append('user_role', tranactionDetails.user_role);
  params = params.append('user_phone', tranactionDetails.user_phone);
  params = params.append('user_name', '');
  params = params.append('owner_id', tranactionDetails.owner_id);
  params = params.append('owner_role', tranactionDetails.owner_role);
  params = params.append('owner_phone', tranactionDetails.owner_phone);
  params = params.append('owner_name', '');
  params = params.append('transaction_type', tranactionDetails.transaction_type);
  params = params.append('service', tranactionDetails.service);
  params = params.append('price', tranactionDetails.price);
  params = params.append('noworri_fees', tranactionDetails.noworri_fees);
  params = params.append('total-price', tranactionDetails.total_price);
  params = params.append('deadDays', '0');
  params = params.append('deadHours', '0');
  params = params.append('deadline', '');
  params = params.append('start', '');
  params = params.append('deadline_type', '');
  params = params.append('revision', '');
  params = params.append('requirement', tranactionDetails.requirement);
  params = params.append('etat', '1');
  params = params.append('deleted', '0');



  return this.http.post(url, tranactionDetails, { responseType: 'json', params: params}).pipe(
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
