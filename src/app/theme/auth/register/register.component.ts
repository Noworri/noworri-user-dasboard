import { GeoLocationService } from "src/app/Service/geo-location.service";
import { AuthserviceService } from "./../../../Service/authservice.service";
import { from, Subject } from "rxjs";
import { RegisterService } from "./register.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { countryISO } from "../../../shared/utils/country";
import * as firebase from "firebase";
import { NgForm } from "@angular/forms";
import { setTNodeAndViewData } from "@angular/core/src/render3/state";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  allowedCountries = countryISO;
  registerForm: FormGroup;
  error: string;
  unsubscribe$ = new Subject();

  windowsRef: any;
  verificationCode: any;
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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService,
    private registerService: RegisterService,
    private geoLocationService: GeoLocationService
  ) {}
  ngOnInit() {
    this.getLocationData();
    this.windowsRef = this.registerService.WindowsRef;
    this.windowsRef.recaptchartVerifier = new firebase.auth.RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log(response);
        },
      }
    );
    this.windowsRef.recaptchartVerifier.render();
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
    // if (this.locationData.country_code === "GH") {
    //   this.prefixContryCode = this.locationData.country_calling_code;
    // } else if (this.locationData.country_code === "NG") {
    //   this.prefixContryCode = this.locationData.country_calling_code;
    // } else {
    //   this.isValidCountry = false;
    //   this.prefixContryCode = "+233";
    // }
    // console.log(" then isValidCountry", this.isValidCountry);
  }

  // phoneNumberProcessing() {
  //   let rawPhoneNumber = (<HTMLInputElement>(
  //     document.getElementById("phoneNumber")
  //   )).value;
  //   let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
  //   if (phoneNumberWithoutSpace.match(this.phoneNumberReg)) {
  //     if (phoneNumberWithoutSpace.charAt(0) === "0") {
  //       this.isCorrectPhoneEntry = true;
  //       this.realPhoneNumber =
  //         this.prefixContryCode + phoneNumberWithoutSpace.substr(1);
  //     } else {
  //       this.isCorrectPhoneEntry = true;
  //       this.realPhoneNumber = this.prefixContryCode + phoneNumberWithoutSpace;
  //     }
  //   } else {
  //     this.isValidUser = false;
  //   }
  // }

  // onMobileNumberSubmit() {
  //   let num = "+22996932147";

  //   const ApVerifier = this.windowsRef.recaptchartVerifier;
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(num, ApVerifier)
  //     .then((confirmationResult) => {
  //       this.windowsRef.confirmationResult = confirmationResult;
  //     })
  //     .catch((error) => {
  //       console.log("firebase error", error);
  //     });
  // }

  // SubmitVerificationCode(form: NgForm) {
  //   const VerificationCode = form.value["VerificationCode"];

  //   this.windowsRef.confirmationResult
  //     .confirm(VerificationCode)
  //     .then((sessionInfo) => {
  //       this.sessionInfo = sessionInfo;
  //     })
  //     .catch((error) => {
  //       console.log("Error", error.message);
  //       this.hasError = true;
  //       this.codeError = error.message;
  //     });
  // }

  // GetProfileInformation(form: NgForm) {
  //   this.lastName = form.value["lastname"];
  //   this.firstName = form.value["firstname"];
  //   this.email = form.value["email"];
  //   this.username = form.value["username"];
  //   this.photo = "";
  //   this.code = form.value["countryCode"];
  //   this.country = form.value["country"];
  //   this.isBuyer = null;
  //   this.isSeller = null;
  //   this.account = null;
  //   this.type = "";
  // }

  registerUser(userData) {
    this.authService
      .register(userData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log("register response", response);
        return response;
      });
  }

  onRegisterSubmit(form: NgForm) {
    this.password = form.value["password"];
    this.password_confirm = form.value["confirm-password"];
    const mobilPhone = this.mobile_phone;
    const lastname = this.lastName;
    const firstname = this.firstName;
    const Email = this.email;
    const username = this.username;
    const password = this.password;

    if (this.password !== this.password_confirm) {
      return null;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            this.userData = {};
            firebase.firestore().collection("users").doc(user.uid).set({
              mobilPhone,
              lastname,
              firstname,
              Email,
              username,
              password,
            });
            this.registerUser(this.userData);
            this.router.navigate(["home"]);
          });
        })
        .catch((error) => {
          setTimeout(() => {
            this.codeError = error.message;
            this.router.navigate(["/auth/login"]);
          }, 4000);
        });
    }
  }
}
