import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataToken, VerifyData, ResetData } from ".";
import { environment } from "../../../environments/environment.prod";
import { capitalizeTokenType } from "../../shared/utils/functions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient = null) {}

  // login(credentials): Observable<DataToken> {
  //   return this.http.post(`${environment.firebaseConfig.authDomain}/oauth/login`, credentials).pipe(
  //     map((res: DataToken) => {
  //       if (res) {
  //         this.removeLockScreen();
  //         this.setDataToken(res);
  //       }
  //       return res;
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.log('Error', error.message);
  //       return throwError(error);
  //     })
  //   );
  // }

  // logout(): Observable<any> {
  //   return this.http.delete(`${environment.firebaseConfig.authDomain}/oauth/logout`).pipe(
  //     map(res => {
  //       return res;
  //     })
  //   );
  // }

  // logoutWithHeader(): Observable<any> {
  //   const dataToken = this.getDataToken();
  //   const headers = {
  //     Authorization: `${capitalizeTokenType(dataToken.token_type)} ${
  //       dataToken.access_token
  //     }`
  //   };
  //   return this.http
  //     .delete(`${environment.firebaseConfig.authDomain}/oauth/logout`, { headers })
  //     .pipe(
  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  // verifyEmail(body: VerifyData): Observable<any> {
  //   return this.http.post(`${environment.firebaseConfig.authDomain}/oauth/forgotpassword`, body).pipe(
  //     map(res => {
  //       return res;
  //     })
  //   );
  // }

  // resetPassword(body: ResetData): Observable<any> {
  //   return this.http.post(`${environment.firebaseConfig.authDomain}/oauth/resetpassword`, body).pipe(
  //     map(res => {
  //       return res;
  //     })
  //   );
  // }

  getDataToken(): DataToken {
    return JSON.parse(localStorage.getItem("dataToken"));
  }

  setDataToken(value: DataToken): void {
    localStorage.setItem("dataToken", JSON.stringify(value));
  }

  removeDataToken() {
    localStorage.removeItem("dataToken");
  }

  getLockScreen(): DataToken {
    return JSON.parse(localStorage.getItem("lockScreen"));
  }

  setLockScreen(value: boolean): void {
    localStorage.setItem("lockScreen", JSON.stringify(value));
  }

  removeLockScreen() {
    localStorage.removeItem("lockScreen");
  }
}
