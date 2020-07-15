import { AuthModule } from "./../auth.module";
import { from, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { countryISO } from "../../../shared/utils/country";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/Service/auth.service";
import { UserReference } from "src/app/Service/reference-data.interface";

const SESSION_STORAGE_KEY = 'noworri-user-session';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error: string;
  allowedCountries = countryISO;
  isValidUser = true;
  isValidating = false;

  unsubscribe = new Subject<Object>();

  phone_number: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      phone_number: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  OnLogin() {
    const phone_number=this.loginForm.get('phone_number').value;
    this.phone_number = `+233${phone_number}`;
    this.password = this.loginForm.get("password").value;
    if (this.phone_number != `+233` && this.password) {
      this.isValidating = true;
      this.authService
        .login(this.phone_number, this.password)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((response: UserReference) => {
          this.isValidating = false;
          if (response.error !== 'Unauthorized') {
            const sessionResponse = {
              first_name: response.currentUser.first_name,
              email: response.currentUser.email,
              mobile_phone: response.currentUser.mobile_phone,
              token: response.currentUser.token,
              user_uid: response.currentUser.user_uid,
              photo: response.currentUser.photo,
              name: response.currentUser.name
            };
            const sessionData = JSON.stringify(sessionResponse);
            sessionStorage.setItem(SESSION_STORAGE_KEY, sessionData);
            this.router.navigate(["home"]);
          } 
        },
        error => {
          this.isValidating = false;
          this.isValidUser = false
        });
    } else {
      this.isValidating = false;
    }
  }
}
