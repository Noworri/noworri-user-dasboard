import { OtpVerificationService } from "./../../../../Service/otp-verification.service";
import { AuthserviceService } from "./../../../../Service/authservice.service";
import { takeUntil } from "rxjs/operators";
import { NgForm } from "@angular/forms";
import { GeoLocationService } from "src/app/Service/geo-location.service";
import { RegisterService } from "./../register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { countryISO } from "./../../../../shared/utils/country";
import { Subject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { isEmpty } from "lodash";

const USER_PHONE_NUMBER = "phoneNumber";
@Component({
  selector: "app-register-step1",
  templateUrl: "./register-step1.component.html",
  styleUrls: ["./register-step1.component.scss"],
})
export class RegisterStep1Component implements OnInit {
  allowedCountries = countryISO;

  error: string;
  unsubscribe$ = new Subject();

  user: any;
  confirmation: {};
  sessionInfo: any;

  mobile_phone: string;
  lastName: string;
  firstName: string;
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  userData: object;
  file: File;
  codeError: string;
  hasError = false;

  country: string;
  uid: string;
  isBuyer: number;
  isSeller: number;
  type: any;
  account: number;
  code: any;
  photo: any;
  locationData: any;
  waitingDisplayInput: boolean;
  countryData: any;
  prefixContryCode: string;
  isValidCountry = true;
  phoneNumberReg = /^\d+$/;
  isCorrectPhoneEntry: boolean;
  realPhoneNumber: string;
  isValidUser = true;
  isRegistredNumber: boolean;
  isCorrectEntryNotification: boolean;
  isSentVerificationCode: boolean;
  isLoadingButton: boolean;
  isButtonActive = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService,
    private registerService: RegisterService,
    private geoLocationService: GeoLocationService,
    private otpverificationService: OtpVerificationService
  ) {}

  ngOnInit() {
    this.getLocationData();
    this.otpverificationService.onInitRecapChat();
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
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixContryCode = "+233";
        }
      });
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
      this.isCorrectPhoneEntry = false;
    }
  }

  // verifier si l'user s'est deja inscrit avec ce numero//

  checkTheNumber(realPhoneNumber) {
    this.authService.getUserDetails(realPhoneNumber).subscribe((user) => {
      if (isEmpty(user)) {
        this.isRegistredNumber = false;
        sessionStorage.setItem(
          USER_PHONE_NUMBER,
          JSON.stringify(realPhoneNumber)
        );
      } else {
        this.isRegistredNumber = true;
        this.isLoadingButton = false;
        this.isButtonActive = true;
      }
    });
  }

  onMobileNumberSubmit() {
    this.phoneNumberProcessing();
    if (this.isCorrectPhoneEntry === true) {
      this.isLoadingButton = true;
      this.isButtonActive = false;
      this.checkTheNumber(this.realPhoneNumber);
    } else {
      this.isCorrectEntryNotification = true;
      this.isLoadingButton = false;
      this.isButtonActive = true;
    }

    setTimeout(() => {
      if (this.isRegistredNumber == false) {
        this.sendVerificationCode(this.realPhoneNumber);
      }
    }, 3000);
  }

  sendVerificationCode(realPhonenumber) {
    this.isLoadingButton = true;
    this.otpverificationService
      .sendVerificationCode(realPhonenumber)
      .then(() => {
        this.isSentVerificationCode = true;
        this.isLoadingButton = false;
        this.isButtonActive = true;
      });
  }

  onSubmitVerificationCode(form: NgForm) {
    this.isLoadingButton = true;
    this.isButtonActive = false;
    const VerificationCode = form.value["VerificationCode"];
    this.otpverificationService
      .submitVerificationCode(VerificationCode)
      .then(() => {
        this.router.navigate(["/auth/register-step2"]);
      })
      .catch((error) => {
        this.isSentVerificationCode = false;
        console.log("Error", error.message);
        this.hasError = true;
        this.codeError = error.message;
      });
  }

  GetProfileInformation(form: NgForm) {
    this.lastName = form.value["lastname"];
    this.firstName = form.value["firstname"];
    this.email = form.value["email"];
    this.username = form.value["username"];
    this.photo = "";
    this.code = form.value["countryCode"];
    this.country = form.value["country"];
    this.isBuyer = null;
    this.isSeller = null;
    this.account = null;
    this.type = "";
  }
}
