import { AuthserviceService } from "./../../../Service/authservice.service";
import { AuthModule } from "./../auth.module";
import { from, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { countryISO } from "../../../shared/utils/country";
import { takeUntil } from "rxjs/operators";
import { UserReference } from "src/app/Service/reference-data.interface";
import { GeoLocationService } from "src/app/Service/geo-location.service";

const USER_SESSION_KEY = "noworri-user-session";
const SESSION_STORAGE_KEY = "user_session_data";

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
  hide = true;
  sessionResponse: any;
  locationData: any;
  unsubscribe = new Subject();
  prefixContryCode: string;
  phone_number: any;
  password: any;
  // rawNumber: string;
  phone: string;
  isValidCountry = true;
  countryData: any;
  waitingDisplayInput: boolean;
  realPhoneNumber: string;
  phoneNumberReg = /^\d+$/;
  isCorrectPhoneEntry: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService,
    private geoLocationService: GeoLocationService
  ) {
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const userData = localStorage.getItem(USER_SESSION_KEY);
    if (userData && sessionData) {
      router.navigate(["home"]);
    }
    this.getLocationData();
  }

  ngOnInit() {}

  onLogin(password) {
    this.phoneNumberProcessing();
    this.password = password.value["passWord"];
    if (this.isCorrectPhoneEntry == true && this.password) {
      this.isValidating = true;
      this.authService
        .login(this.realPhoneNumber, this.password)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (response: UserReference) => {
            this.isValidating = false;
            if (response.error !== "Unauthorized") {
              this.sessionResponse = {
                first_name: response.currentUser.first_name,
                email: response.currentUser.email,
                mobile_phone: response.currentUser.mobile_phone,
                user_uid: response.currentUser.user_uid,
                photo: response.currentUser.photo,
                name: response.currentUser.name,
                status: response.currentUser.status,
              };
              const sessionData = {
                token: response.currentUser.token,
              };
              const sessionStorageData = JSON.stringify(sessionData);
              sessionStorage.setItem("user_session_data", sessionStorageData);
              const userData = JSON.stringify(this.sessionResponse);
              localStorage.setItem(USER_SESSION_KEY, userData);
              this.router.navigate(["home"]);
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

  phoneNumberProcessing() {
    let rawPhoneNumber = (<HTMLInputElement>(
      document.getElementById("phoneNumber")
    )).value;

    let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
    if (phoneNumberWithoutSpace.match(this.phoneNumberReg)) {
      if (phoneNumberWithoutSpace.charAt(0) === "0") {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber =
          this.prefixContryCode + phoneNumberWithoutSpace.substr(1);
      } else {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber = this.prefixContryCode + phoneNumberWithoutSpace;
      }
    } else {
      this.isValidUser = false;
    }
  }

  getLocationData() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    })
      .then(() => {
        if (!this.locationData) {
          this.waitingDisplayInput = false;
        } else {
          this.waitingDisplayInput = true;
          this.countryData = {
            preferredCountries: [`${this.locationData}`],
            localizedCountries: { ng: "Nigeria", gh: "Ghana" },
            onlyCountries: ["GH", "NG"],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === "GH" ||
          this.locationData.country_code === "NG"
        ) {
          this.prefixContryCode = this.locationData.country_calling_code;
          console.log(this.prefixContryCode);
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixContryCode = "+233";
        }
      });
  }
}
