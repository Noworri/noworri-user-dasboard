import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  processPayment(body): Observable<any> {
    const url = "https://developer.ecobank.com/corporateapi/merchant/card";

    let headers = new HttpHeaders();
    headers.append("Authorization", "Bearer {{access_token}}");
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "developer.ecobank.com");

    return this.http.post(url, body, { headers }).pipe(
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
