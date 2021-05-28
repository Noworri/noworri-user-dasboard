import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import icPhone from "@iconify/icons-ic/twotone-phone";
import { AuthserviceService } from "src/app/services/authservice.service";
import { GeoLocationService } from "src/app/services/geo-location.service";
import { OtpVerificationService } from "src/app/services/otp-verification.service";
import { countryISO, USER_SESSION_KEY } from "src/app/Models/constants";
import { Subject, throwError } from "rxjs";
import { catchError, take, takeUntil } from "rxjs/operators";
import { UserSession } from "src/app/Models/interfaces";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "vex-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  animations: [fadeInUp400ms],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  allowedCountries = countryISO;

  error: string;
  unsubscribe$ = new Subject();

  user: any;
  icPhone = icPhone;
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
  prefixCountryCode: string;
  isValidCountry = true;
  phoneNumberReg = /^\d+$/;
  isCorrectPhoneEntry: boolean;
  realPhoneNumber: string;
  isValidUser = true;
  isRegistredNumber: boolean;
  isCorrectEntryNotification: boolean;
  isCodeVerified = false;
  isLoadingButton: boolean;
  isButtonActive = true;
  codeError: string;
  hasError = false;
  isOTPSent = false;

  inputType = "password";
  visible = false;
  otp: string;
  userData: UserSession;

  otpCode: FormControl;
  phoneNumber: FormControl;
  validationMessages = {
    phoneNumber: {
      required: "Phone number  is required.",
      pattern: "Only digits allowed",
    },
    otpCode: {
      required: "OTP is required",
      pattern: "Only digits allowed",
    },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private geoLocationService: GeoLocationService,
    private route: ActivatedRoute,
    private otpverificationService: OtpVerificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      phoneNumber: ["", Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      otpCode: ["", Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    });
    this.otpCode = new FormControl(this.form.value["otpCode"], [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);

    this.phoneNumber = new FormControl(this.form.value["phoneNumber"], [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);

    this.getLocationData();
    this.otpverificationService.onInitRecapChat();
  }

  sendOTP() {
    this.processPhoneNumber();
    if (this.isCorrectPhoneEntry === true) {
      this.isLoadingButton = true;
      this.isButtonActive = false;
      this.sendVerificationCode(this.realPhoneNumber);
    } else {
      this.isCorrectEntryNotification = true;
      this.isLoadingButton = false;
      this.isButtonActive = true;
    }
  }

  sendVerificationCode(mobilePhone) {
    this.hasError = false;
    const data = {
      mobile_phone: mobilePhone,
    };
    this.isLoadingButton = true;
    this.authService
      .sendSMSVerificationCode(data)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.isLoadingButton = false;
          this.isButtonActive = true;
          this.isOTPSent = true;
        } else {
          this.isLoadingButton = false;
          this.isButtonActive = true;
          this.hasError = true;
          this.codeError = response["message"];
        }
      });
  }

  processPhoneNumber() {
    let rawPhoneNumber = this.form.value["phoneNumber"];

    let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
    if (phoneNumberWithoutSpace.match(this.phoneNumberReg)) {
      if (phoneNumberWithoutSpace.charAt(0) === "0") {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber =
          this.prefixCountryCode + phoneNumberWithoutSpace.substr(1);
      } else {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber = this.prefixCountryCode + phoneNumberWithoutSpace;
      }
    } else {
      this.isCorrectPhoneEntry = false;
    }
  }

  onOtpInput(otp) {
    this.otp = otp;
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
          this.prefixCountryCode = this.locationData.country_calling_code;
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixCountryCode = "+233";
        }
      });
  }

  verifyOTP() {
    this.isLoadingButton = true;
    this.isButtonActive = false;
    const data = {
      code: this.otp,
      mobile_phone: this.realPhoneNumber
    }

    this.authService
      .verifyUserByOTP(data)
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (response["status"] === true) {
            this.userData = response['data'];
            const message = "OTP Verified Successfully!";
            this.openSnackbar(message);
            this.isCodeVerified = true;
          }
        },

        catchError((error) => {
          this.isCodeVerified = false;
          console.log("Error", error.message);
          this.hasError = true;
          this.codeError = error.message;
          return throwError(error.message);
        })
      );
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }
}
