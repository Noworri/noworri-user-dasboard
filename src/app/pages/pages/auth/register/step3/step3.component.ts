import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { AuthserviceService } from "src/app/services/authservice.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import firebase from "firebase";
import { ErrorStateMatcher } from "@angular/material/core";
import { LoadingBarService } from '@ngx-loading-bar/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
@Component({
  selector: "vex-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  validationMessages = {
    password: {
      required: "Password  is required.",
      pattern:
        "Please enter 8 characters password with numbers and special characters",
    },
    passwordConfirm: {
      required: "Password confirmation is required",
    },
    terms: {
      hasNotcheckedTerms: "Please accept the terms and conditions to process",
    },
    passwordsDoNotMatch: "The 2 passwords do no match ",

  };

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  unsubscribe$ = new Subject();
  userUid: string;
  userToken: string;
  isLoadingButton: boolean;
  isButtonActive = true;
  userData;
  userResponseData: any;
  isCorrectPasswordData: boolean;
  passwordsMatch = true;
  errorMessage: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private loadingBar: LoadingBarService
  
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      terms:  ["", this.validateTermsAndConditions]
    },
    {
      validator: this.validatePasswords
    }
    );
    this.getUserData();
  }

  send() {
    this.router.navigate(["/auth/login"]);
  }

  validatePasswords(form: FormGroup): ValidationErrors {
    const password = form.value["password"];
    const confirmPassword = form.value["passwordConfirm"];
    if (confirmPassword === password) {
      return null;
    } else {
      return {
        passwordsDoNotMatch: true,
      };
    }
  }

  validateTermsAndConditions(control: FormControl): ValidationErrors {
    const value = control.value;
    const checked = value === true ? true : false;
    return checked === false ? { hasNotcheckedTerms: true} : null;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  registerUser() {
   
    this.isLoadingButton = true;
    this.isButtonActive = false;
    this.loadingBar.start()
    const passWord = this.form.value["password"];
    const confirm_password = this.form.value["passwordConfirm"];
    const email = this.userData["email"];
    this.procesPasswordInformation(email, passWord, confirm_password);
  }

  procesPasswordInformation(email, password, confirm_password) {
    if (password === confirm_password) {
      this.isCorrectPasswordData = true;
      this.passwordsMatch = true;
      this.signUpWithFirebase(email, password, this.userData)
        .then(() => {
          this.signUpUser(password);
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = err.message;
        });
    } else {
      this.passwordsMatch = false;
      this.isLoadingButton = false;
      this.isButtonActive = true;
    }
  }

  getUserData() {
    const userProfilData = JSON.parse(
      sessionStorage.getItem("profilInformation")
    );
    if (!userProfilData) {
      this.router.navigate(['auth/register/step1']);
    }
    const userPhoneNumber = JSON.parse(sessionStorage.getItem("phoneNumber"));
    this.userData = {
      ...userProfilData,
      mobile_phone: userPhoneNumber,
    };
  }

  async signUpWithFirebase(email, password, userProfilData) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.getUserToken().then(() => {
          this.saveUserDataToFireStore(userProfilData);
        });
      });
  }

  saveUserDataToFireStore(userProfilData) {
    firebase.auth().onAuthStateChanged((userData) => {
      let userUid = userData.uid;
      this.userUid = userUid;
      firebase
        .firestore()
        .collection("users")
        .doc(userUid)
        .set({
          ...userProfilData,
        });
    });
  }

  signUpUser(password) {
    this.loadingBar.start()
    let userData = {
      ...this.userData,
      password: password,
      user_uid: this.userUid,
      user_name: this.userUid,
      fcm_token: "N/A",
      web_token: this.userToken,
    };
    this.authService
      .register(userData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if(response?.user_uid) {
          this.userResponseData = response;
          this.isLoadingButton = false;
          this.isButtonActive = true;
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 3000);
        } else {
          this.errorMessage = 'Something went wrong please try again';
        }
      });
  }

  async getUserToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        this.userToken = token;
      });
  }
}
