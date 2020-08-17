import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TransactionsReference } from './reference-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getUserTransactions(userId: string): Observable<any> {
    const url = 'https://api.noworri.com/api/usertransactions/' + userId;

    return this.http.get(url).pipe(
      map((data: TransactionsReference[]) => {
        data.map((values) => {
          if (typeof values.total_price === undefined) {
            values.total_price = values.price;
          }
          if (values.etat === '0') {
            values.state = 'Cancelled';
          } else if (values.etat === '1') {
            values.state = 'Pending';
          } else if (values.etat === '2') {
            values.state = 'Completed';
          } else if (values.etat === '3') {
            values.state = 'Approved';
          } else if (values.etat === '4') {
            values.state = 'Secured';
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
    const url =
      'https://api.noworri.com/api/getusertransaction/' + transaction_id;

    return this.http.get(url).pipe(
      map((data: TransactionsReference[]) => {
        data.map((transaction) => {
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

  secureFunds(transaction_id) {
    const url = `https://api.noworri.com/api/securefunds/${transaction_id}`;
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

  startService(transaction_id) {
    const url = `https://api.noworri.com/api/startservice/${transaction_id}`;
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

  approveService(transaction_id) {
    const url = `https://api.noworri.com/api/approveservice/${transaction_id}`;
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

  uploadFile(file: File) {
    // 279414289
    const url = `https://api.noworri.com/api/newtransactionupload`;
    // let params = new HttpParams();
    // params = params.append('file', files);
    const formData: FormData = new FormData();
    formData.append('fichier', file);

    return this.http
      .post(url, formData, {responseType: 'json'})
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error', error.message);
          return observableThrowError(error);
        })
      );
  }

  mapUploadedFiles(transaction_id, paths) {
    const url = `https://api.noworri.com/api/matchtransactionupload`;
    let params = new HttpParams();
    params = params.append('path', paths);
    params = params.append('transaction_id', transaction_id);

    return this.http
      .post(url, null, {responseType: 'json', params: params})
      .pipe(
        map((response: any) => {
          console.log(response);
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

  createTransaction(transactionDetails) {
    const url = 'https://api.noworri.com/api/createusertransaction';
    let params = new HttpParams();
    if (!transactionDetails.deadline || !transactionDetails.revision) {
      transactionDetails.deadline = '';
      transactionDetails.revision = '';
    }
    if (!transactionDetails.file_path) {
      transactionDetails.file_path = '';
    }

    params = params.append('user_id', transactionDetails.user_id);
    params = params.append('user_role', transactionDetails.user_role);
    params = params.append('user_phone', transactionDetails.user_phone);
    params = params.append('user_name', '');
    params = params.append('owner_id', transactionDetails.owner_id);
    params = params.append('owner_role', transactionDetails.owner_role);
    params = params.append('owner_phone', transactionDetails.owner_phone);
    params = params.append('owner_name', '');
    params = params.append(
      'transaction_type',
      transactionDetails.transaction_type
    );
    params = params.append('service', transactionDetails.service);
    params = params.append('price', transactionDetails.price);
    params = params.append('noworri_fees', transactionDetails.noworri_fees);
    params = params.append('total-price', transactionDetails.total_price);
    params = params.append('deadDays', '0');
    params = params.append('deadHours', '0');
    params = params.append('deadline', transactionDetails.deadline);
    params = params.append('start', '');
    params = params.append('deadline_type', transactionDetails.deadline_type);
    params = params.append('revision', transactionDetails.revision);
    params = params.append('requirement', transactionDetails.requirement);
    params = params.append('file_path', transactionDetails.file_path);
    params = params.append('etat', '1');
    params = params.append('deleted', '0');

    return this.http
      .post(url, transactionDetails, { responseType: 'json', params: params })
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

  getStepTransDetails(transaction_id) {
    const url = `https://api.noworri.com/api/getsteptransdetails/${transaction_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }

  getTransactionUploads(transaction_id) {
    const url = `https://api.noworri.com/api/gettransactionfiles/${transaction_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error.message);
        return observableThrowError(error);
      })
    );
  }

  setStepTransaction(stepDetails) {
    const url = 'https://api.noworri.com/api/setsteptrans';
    let params = new HttpParams();
    const accepted = 1;

    params = params.append('transaction_id', stepDetails.transaction_id);
    params = params.append('step', stepDetails.step);
    params = params.append('description', stepDetails.description);
    params = params.append('accepted', `${accepted}`);

    return this.http
      .post(url, stepDetails, { responseType: 'json', params: params })
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
