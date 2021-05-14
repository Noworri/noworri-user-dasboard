import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { TransactionsReference } from "./reference-data.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  status: string;

  constructor(private http: HttpClient) {}

  getUserTransactions(userId: string, range = null): Observable<any> {
    let params = new HttpParams();
    if (range) {
      params = params.append("from", range.from);
      params = params.append("to", range.to);
    } else {
      params = null;
    }
    const url = `${environment.getTransactionsListUrl}${userId}`;
    return this.http.get(url, { params: params }).pipe(
      map((data: TransactionsReference[]) => {
        data.map((values) => {
          if (typeof values.total_price === undefined) {
            values.total_price = values.price;
          }

          if (values.etat)
            if (values.etat === "0") {
              values.state = "Cancelled";
            } else if (values.etat === "1") {
              values.state = "Pending";
            } else if (values.etat === "3") {
              values.state = "Funds Released";
            } else if (values.etat === "5") {
              values.state = "Funds Withdrawn";
            } else if (values.etat === "2") {
              values.state = "Funds Secured";
            } else if (values.etat === "4") {
              values.state = "Deleted";
            }
          return values;
        });

        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getUserTransaction(transaction_id: string): Observable<any> {
    const url = `${environment.getTransactionByIdUrl}${transaction_id}`;

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
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getBusinessUserPayouts(user_id: string): Observable<any> {
    const url = `${environment.getBusinessUserPayoutsUrl}${user_id}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  processPayment(body): Observable<any> {
    const url = "https://api.noworri.com/api/makecardpayment";
    let params = new HttpParams();
    const amount = body.paymentDetails.amount.toString();

    params = params.append("amount", amount);
    // , { responseType: 'json', params: params}
    return this.http.post(url, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  markSecuredFunds(transaction_id) {
    const url = `https://api.noworri.com/api/securefunds/${transaction_id}`;
    return this.http.post(url, null).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
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
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  processBusinessPayout(data) {
    const url = `${environment.processPayoutUrl}`;

    return this.http
      .post(url, data, { responseType: "json" })
      .pipe(
        map((response: any) => {
          const releaseFundsData = response.data;
          // if (releaseFundsData) {
          //   this.finalizeReleasePaystack(releaseFundsData);
          // }
          return releaseFundsData;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  initiateWithdrawal(data) {
    const url = `${environment.payStackReleaseUrl}${data.transactionID}`;
    let params = new HttpParams();
    params = params.append("source", "balance");
    params = params.append("reason", "Noworri Payment Release");
    params = params.append("amount", data.amount);
    params = params.append("recipient", data.recipient);
    params = params.append("currency", data.currency);
    params = params.append("user_id", data.user_id);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          const releaseFundsData = response.data;
          // if (releaseFundsData) {
          //   this.finalizeReleasePaystack(releaseFundsData);
          // }
          return releaseFundsData;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  initiateRefundPaystack(data) {
    const url = `https://api.noworri.com/api/initiaterefund`;
    let params = new HttpParams();
    params = params.append("transaction", data.transaction_ref);
    params = params.append("customer_note", "Transaction cancelled");
    params = params.append("amount", data.amount);
    params = params.append("currency", data.currency);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          const releaseFundsData = response.data;
          return releaseFundsData;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  finalizeReleasePaystack(data) {
    const url = `https://api.noworri.com/api/paystackrelease/test`;
    let params = new HttpParams();
    params = params.append("transfer_code", data.transfer_code);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  cancelOrder(data) {
    const url = `${environment.cancelTransactionUrl}`;
    let params = new HttpParams();
    params = params.append('id', data.id);
    params = params.append('canceled_by', data.canceled_by);
    return this.http.get(url, {params}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
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
        console.log("Error", error.message);
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
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyReleaseCode(data) {
    const url = environment.verifyReleaseCodeUrl;
    let params = new HttpParams();
    params = params.append("id", data.transaction_id);
    params = params.append("release_code", data.release_code);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  updateDeliveryPhone(transaction_id, delivery_phone) {
    const url = environment.updateDeliveyUrl;
    let params = new HttpParams();
    params = params.append("deliver", delivery_phone);
    params = params.append("id", transaction_id);
    const body = {
      deliver: delivery_phone,
      id: transaction_id,
    };

    return this.http.post(url, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  payStackPayment(paymentData) {
    const url = environment.payStackCheckoutUrl;
    let params = new HttpParams();
    params = params.append("email", paymentData.email);
    params = params.append("amount", paymentData.amount);
    params = params.append("currency", paymentData.currency);
    params = params.append("callback_url", paymentData.callback_url);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  checkTransactionStatus(ref, transaction_key = null) {
    const url = environment.checkTransactionStatusUrl;
    const transactionData = {
      payment_id: ref,
      transaction_key: transaction_key,
    };
    let params = new HttpParams();
    params = params.append("payment_id", transactionData.payment_id);
    params = params.append("transaction_key", transactionData.transaction_key);
    return this.http.get(url, { responseType: "json", params: params }).pipe(
      map((response: any) => {
        if (response.data) {
          this.status = response.data.status;
        }
        return response;
      })
    );
  }

  addNewAccount(accountDetails) {
    const url = `https://api.noworri.com/api/adduseraccounttest/${accountDetails.userId}`;
    let params = new HttpParams();
    params = params.append("bank_name", accountDetails.bankName);
    params = params.append("bank_code", accountDetails.bankCode);
    params = params.append("name", accountDetails.holderName);
    params = params.append("account_number", accountDetails.accountNo);
    params = params.append("type", accountDetails.type);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error:", error.message);
          return observableThrowError(error);
        })
      );
  }

  deleteUserAccount(accountDetails) {
    const url = environment.deleteAccountUrl;
    return this.http.post(url, accountDetails, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error:", error.message);
        return observableThrowError(error);
      })
    );
  }

  getAccountDetails(user_id) {
    const url = `${environment.getUserAccountDetailsUrl}${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error: ", error.message);
        return observableThrowError(error);
      })
    );
  }

  getBanks(country) {
    const url = "https://api.paystack.co/bank";
    let params = new HttpParams();
    params = params.append("country", country);
    return this.http.get(url, { responseType: "json", params: params }).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error: ", error.message);
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
    formData.append("fichier", file);

    return this.http.post(url, formData, { responseType: "json" }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  mapUploadedFiles(transaction_id, paths) {
    const url = `https://api.noworri.com/api/matchtransactionupload`;
    let params = new HttpParams();
    params = params.append("path", paths);
    params = params.append("transaction_id", transaction_id);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  makeMomoPayment() {
    const url = "https://api.noworri.com/api/paywithmomo";
    return this.http.post(url, null).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  updateDeadline(data) {
    const url = `https://api.noworri.com/api/updatedeadline/${data.transaction_id}/${data.new_deadline}`;

    return this.http.post(url, null).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  createRecipient(details, userId) {
    const url = `${environment.addAccountUrl}${userId}`;
    let params = new HttpParams();
    params = params.append("type", details.type);
    params = params.append("name", details.name);
    params = params.append("description", details.description);
    params = params.append("account_number", details.account_number);
    params = params.append("bank_code", details.bank_code);
    params = params.append("currency", details.currency);
    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  updateRecipient(details, userId) {
    const url = `${environment.updateAccountUrl}${userId}`;
    let params = new HttpParams();
    params = params.append("type", details.type);
    params = params.append("name", details.name);
    params = params.append("description", details.description);
    params = params.append("account_number", details.account_number);
    params = params.append("bank_code", details.bank_code);
    params = params.append("currency", details.currency);
    params = params.append("recipient_code", details.recipient_code);
    
    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  createTransaction(transactionDetails) {
    const url = environment.createTransactionUrl;
    if (!transactionDetails.deadline || !transactionDetails.revision) {
      transactionDetails.deadline = "";
      transactionDetails.revision = 0;
    }
    if (!transactionDetails.file_path) {
      transactionDetails.file_path = "N/A";
    }

    return this.http
      .post(url, transactionDetails, { responseType: "json" })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
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
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getUserTransactionSummary(user_id, range =  null) {
    let params = new HttpParams();
    if (range) {
      params = params.append("from", range.from);
      params = params.append("to", range.to);
    } else {
      params = null;
    }
    const url = `${environment.getBusinessTransactionsSummaryUrl}${user_id}`;
    return this.http.get(url, {params: params}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
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
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  setStepTransaction(stepDetails) {
    const url = "https://api.noworri.com/api/createsteptrans";
    let params = new HttpParams();
    if (!stepDetails.accepted) {
      stepDetails.accepted = 0;
    }

    params = params.append("transaction_id", stepDetails.transaction_id);
    params = params.append("step", stepDetails.step);
    params = params.append("description", stepDetails.description);
    params = params.append("accepted", stepDetails.accepted);

    return this.http
      .put(url, stepDetails, { responseType: "json", params: params })
      .pipe(
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
