
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }



  createNewBusiness(businessData) {
    const url = 'https://api.noworri.com/api/addbusiness';
    const formData = new FormData();
    formData.append('business_email', businessData['business_email']);
    formData.append('business_legal_name', businessData['business_legal_name']);
    formData.append('business_logo', businessData['business_logo']);
    formData.append('business_name', businessData['business_name']);
    formData.append('business_phone', businessData['business_phone']);
    formData.append('city', businessData['city']);
    formData.append('company_document_path', businessData['company_documentUpload']);
    formData.append('country', businessData['country']);
    formData.append('delivery_no', businessData['delivery_no']);
    formData.append('description', businessData['description']);
    formData.append('DOB', businessData['dob']);
    formData.append('id_type', businessData['identification_document']);
    formData.append('id_card', businessData['identification_documentUpload']);
    formData.append('industry', businessData['industry']);
    formData.append('is_legally_registered', businessData['is_legally_registered']);
    formData.append('nationality', businessData['nationality']);
    formData.append('business_address', businessData['owner_adresse']);
    formData.append('owner_fname', businessData['owner_fname']);
    formData.append('owner_lname', businessData['owner_lname']);
    formData.append('region', businessData['region']);
    formData.append('status', businessData['status']);
    formData.append('trading_name', businessData['trading_name']);
    formData.append('user_id', businessData['user_id']);
    formData.append('category', 'dfd');
    formData.append('owner_address', 'dfd');
    return this.http
      .post(url, formData, { responseType: 'json', })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error:', error.message);
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
