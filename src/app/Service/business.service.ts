import { Observable, throwError as observableThrowError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  createNewBusiness(allData) {
    const url = "https://api.noworri.com/api/addbusiness";
    let params = new HttpParams();
    params = params.append("business_email", allData["business_email"]);
    params = params.append(
      "business_legal_name",
      allData["business_legal_name"]
    );
    params = params.append("business_logo", allData["business_logo"]);
    params = params.append("business_name", allData["business_name"]);
    params = params.append("business_phone", allData["business_phone"]);
    params = params.append("city", allData["city"]);
    params = params.append(
      "company_document_path",
      allData["company_documentUpload"]
    );
    params = params.append("country", allData["country"]);
    params = params.append("delivery_no", allData["delivery_no"]);
    params = params.append("description", allData["description"]);
    params = params.append("DOB", allData["dob"]);
    params = params.append("id_type", allData["identification_document"]);
    params = params.append("id_card", allData["identification_documentUpload"]);
    params = params.append("industry", allData["industry"]);
    params = params.append(
      "is_legally_registered",
      allData["is_legally_registered"]
    );
    params = params.append("nationality", allData["nationality"]);
    params = params.append("business_address", allData["owner_adresse"]);
    params = params.append("owner_fname", allData["owner_fname"]);
    params = params.append("owner_lname", allData["owner_lname"]);
    params = params.append("region", allData["region"]);
    params = params.append("status", allData["status"]);
    params = params.append("trading_name", allData["trading_name"]);
    params = params.append("user_id", allData["user_id"]);
    params = params.append("category", "dfd");
    params = params.append("owner_address", "dfd");
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

  getBusinessDetails(user_id) {
    const url = `https://api.noworri.com/api/getuserbusiness/${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("Error:", error.message);
        return observableThrowError(error);
      })
    );
  }
}
