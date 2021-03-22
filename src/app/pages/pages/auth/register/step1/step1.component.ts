import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { pipe, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { countryISO } from "src/app/Models/constants";
import { AuthserviceService } from "src/app/services/authservice.service";
import { GeoLocationService } from "src/app/services/geo-location.service";
import { OtpVerificationService } from "src/app/services/otp-verification.service";

@Component({
  selector: "vex-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.scss"],
})
export class Step1Component implements OnInit {
  form: FormGroup;
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
  isOTPSent = false;

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

  inputType = "password";
  visible = false;
  otp: string;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
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
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private geoLocationService: GeoLocationService,
    private route: ActivatedRoute,
    private otpverificationService: OtpVerificationService
  ) {}

  ngOnInit(): void {
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
          this.prefixContryCode = this.locationData.country_calling_code;
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixContryCode = "+233";
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

  verifyUser(realPhoneNumber) {
    this.authService
      .getUserDetails(realPhoneNumber)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (!user) {
          this.isRegistredNumber = false;
          sessionStorage.setItem(
            "phoneNumber",
            JSON.stringify(realPhoneNumber)
          );
          this.sendVerificationCode(this.realPhoneNumber);
        } else {
          this.isRegistredNumber = true;
          this.isLoadingButton = false;
          this.isButtonActive = true;
        }
      });
  }

  sendOtp() {
    this.processPhoneNumber();
    if (this.isCorrectPhoneEntry === true) {
      this.isLoadingButton = true;
      this.isButtonActive = false;
      this.verifyUser(this.realPhoneNumber);
    } else {
      this.isCorrectEntryNotification = true;
      this.isLoadingButton = false;
      this.isButtonActive = true;
    }
  }

  sendVerificationCode(realPhonenumber) {
    this.isOTPSent = true;
    this.isLoadingButton = true;
    this.otpverificationService
      .sendVerificationCode(realPhonenumber)
      .then(() => {
        this.isSentVerificationCode = true;
        this.isLoadingButton = false;
        this.isButtonActive = true;
      });
  }

  verifyOTP() {
    this.isLoadingButton = true;
    this.isButtonActive = false;
    const verificationCode = this.form.value["otpCode"];

    this.otpverificationService
      .submitVerificationCode(verificationCode)
      .then((response) => {
        console.log('verify otp response', response);
        this.router.navigate(["auth/register/step2"]);
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


  toggleVisibility() {
    if (this.visible) {
      this.inputType = "phoneNumber";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  navigate(route) {
    this.router.navigate([route]);
  }
}
