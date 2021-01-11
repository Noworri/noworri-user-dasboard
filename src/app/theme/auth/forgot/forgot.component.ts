import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { OtpVerificationService } from "./../../../Service/otp-verification.service";
import { AuthserviceService } from "src/app/Service/authservice.service";
import { AuthService } from "./../../../core/auth/auth.service";
import { GeoLocationService } from "./../../../Service/geo-location.service";
import { Component, OnInit } from "@angular/core";
import { isEmpty } from "lodash";

const USER_PHONE_NUMBER = "phoneNumber";
@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  constructor(
    private geoLocationService: GeoLocationService,
    private authService: AuthserviceService,
    private otpverificationService: OtpVerificationService,
    private router: Router
  ) {}
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
  isLoadingButton: boolean;
  isButtonActive = true;
  isCorrectEntryNotification: boolean;
  isSentVerificationCode: boolean;
  hasError: boolean;
  codeError: boolean;
  ngOnInit() {
    this.getLocationData();
    this.otpverificationService.onInitRecapChat();
  }

  onResetPassword() {
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
        let num = "+22964037324";
        this.sendVerificationCode(num);
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
        this.router.navigate(["/auth/forgot2"]);
      })
      .catch((error) => {
        this.isSentVerificationCode = false;
        console.log("Error", error.message);
        this.hasError = true;
        this.codeError = error.message;
      });
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

  checkTheNumber(realPhoneNumber) {
    this.isLoadingButton = true;
    this.authService.getUserDetails(realPhoneNumber).subscribe((user) => {
      if (isEmpty(user)) {
        this.isLoadingButton = false;
        this.isRegistredNumber = true;
      } else {
        sessionStorage.setItem(
          USER_PHONE_NUMBER,
          JSON.stringify(realPhoneNumber)
        );
        this.isLoadingButton = false;
        this.isButtonActive = true;
      }
    });
  }
}
