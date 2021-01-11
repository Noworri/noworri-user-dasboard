import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  login(phoneNumber, password): Observable<any> {
    const url = "https://api.noworri.com/api/login";
    const body = {
      mobile_phone: phoneNumber,
      password: password,
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

  register(userData): Observable<any> {
    const url = "https://api.noworri.com/api/register";
    let params = new HttpParams();
    params = params.append("user_uid", userData.user_uid);
    params = params.append("email", userData.email);
    params = params.append("name", userData.name);
    params = params.append("first_name", userData.first_name);
    params = params.append("mobile_phone", userData.mobile_phone);
    params = params.append("user_name", userData.user_name);
    params = params.append("country", userData.country);
    params = params.append("photo", userData.photo);
    params = params.append("isBuyer", userData.isBuyer);
    params = params.append("isSeller", userData.isSeller);
    params = params.append("type", userData.type);
    params = params.append("account", userData.account);
    params = params.append("password", userData.password);
    params = params.append("dailing_code", userData.dailing_code);
    params = params.append("country_code", userData.country_code);
    params = params.append("web_token", userData.web_token);
    params = params.append("fcm_token", userData.fcm_token);

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

  uploadFile(file: File, uid: string) {
    // 279414289
    const url = `https://api.noworri.com/api/uploadpp`;
    const formData: FormData = new FormData();
    formData.append("photo", file);
    formData.append("uid", uid);

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

  mapUploadedFiles(user_id, path) {
    const url = `https://api.noworri.com/api/matchuserupload`;
    let params = new HttpParams();
    params = params.append("path", path);
    params = params.append("transaction_id", user_id);

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

  getUserDetails(phoneNumber): Observable<any> {
    const url = "https://api.noworri.com/api/getuserbyphone";
    let params = new HttpParams();
    params = params.append("user_phone", phoneNumber);

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

  getUserDetailsById(uid): Observable<any> {
    const url = "https://api.noworri.com/api/getuserbyid";
    let params = new HttpParams();
    params = params.append("uid", uid);

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
}
