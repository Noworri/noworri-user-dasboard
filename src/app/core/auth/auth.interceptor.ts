import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from "@angular/common/http";
import { AuthService } from ".";
import { Observable } from "rxjs/Observable";
import { capitalizeTokenType } from "../../shared/utils/functions";
import { throwError } from "rxjs";
import { catchError, flatMap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { DataToken } from "./auth.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private http: HttpClient) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.auth.getDataToken() &&
      !this.auth.getLockScreen() &&
      !request.url.includes("oauth")
    ) {
      let dataToken = this.auth.getDataToken();
      request = request.clone({
        setHeaders: {
          Authorization: `${capitalizeTokenType(dataToken.token_type)} ${
            dataToken.access_token
          }`,
        },
      });

      // return next.handle(request).pipe(
      //   catchError(error => {
      //     if (error.status === 401) {
      //       const body = {
      //         refresh_token: dataToken.refresh_token,
      //         grant_type: 'refresh_token'
      //       };
      //       return this.http
      //         .post(`${environment.firebaseConfig.authDomain}/oauth/refresh`, body)
      //         .pipe(
      //           flatMap((res: DataToken) => {
      //             if (res && res.access_token) {
      //               this.auth.removeLockScreen();
      //               dataToken = this.auth.getDataToken();
      //               const userData = dataToken.user;
      //               const resToken = { ...res, user: userData };
      //               this.auth.setDataToken(resToken);
      //               request = request.clone({
      //                 setHeaders: {
      //                   Authorization: `${capitalizeTokenType(
      //                     resToken.token_type
      //                   )} ${resToken.access_token}`
      //                 }
      //               });
      //               return next.handle(request).pipe(
      //                 catchError(err => {
      //                   // this.logout();
      //                   return throwError(error);
      //                 })
      //               );
      //             } else {
      //               this.logout();
      //             }
      //           }),
      //           catchError(err => {
      //             this.logout();
      //             return throwError(error);
      //           })
      //         );
      //     }
      //     return throwError(error);
      //   })
      // );
    }
    return next.handle(request);
  }

  logout() {
    this.auth.removeLockScreen();
    this.auth.removeDataToken();
    location.reload();
  }
}
