import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method.toLowerCase() !== "get") {
      request = request.clone({
        setHeaders: {
          Accept: "application/json"
        }
      });
    }
    return next.handle(request);
  }
}
