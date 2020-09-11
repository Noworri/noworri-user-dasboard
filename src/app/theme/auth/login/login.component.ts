import { AuthModule } from './../auth.module';
import { from, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { countryISO } from '../../../shared/utils/country';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Service/auth.service';
import { UserReference } from 'src/app/Service/reference-data.interface';

const USER_SESSION_KEY = 'noworri-user-session';
const SESSION_STORAGE_KEY = 'user_session_data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error: string;
  allowedCountries = countryISO;
  isValidUser = true;
  isValidating = false;
  hide = true;
  sessionResponse: any;

  unsubscribe = new Subject();

  phone_number: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const userData = localStorage.getItem(USER_SESSION_KEY);
    if (userData && sessionData) {
      router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  OnLogin() {
    const phone_number = this.loginForm.get('phone_number').value;
    this.phone_number = `+233${phone_number}`;
    this.password = this.loginForm.get('password').value;
    if (this.phone_number != `+233` && this.password) {
      this.isValidating = true;
      this.authService
        .login(this.phone_number, this.password)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (response: UserReference) => {
            this.isValidating = false;
            if (response.error !== 'Unauthorized') {
              this.sessionResponse = {
                first_name: response.currentUser.first_name,
                email: response.currentUser.email,
                mobile_phone: response.currentUser.mobile_phone,
                user_uid: response.currentUser.user_uid,
                photo: response.currentUser.photo,
                name: response.currentUser.name,
              };
              const sessionData = {
                token: response.currentUser.token,
              }
              const sessionStorageData = JSON.stringify(sessionData);
              sessionStorage.setItem('user_session_data',sessionStorageData);
              const userData = JSON.stringify(this.sessionResponse);
              localStorage.setItem(USER_SESSION_KEY, userData);
              this.router.navigate(['home']);
            }
          },
          (error) => {
            this.isValidating = false;
            this.isValidUser = false;
          }
        );
    } else {
      this.isValidating = false;
    }
  }
}
