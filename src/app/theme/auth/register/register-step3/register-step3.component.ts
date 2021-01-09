import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthserviceService } from "./../../../../Service/authservice.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import * as firebase from "firebase";

@Component({
  selector: "app-register-step3",
  templateUrl: "./register-step3.component.html",
  styleUrls: ["./register-step3.component.scss"],
})
export class RegisterStep3Component implements OnInit {
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  isCorrectPasswordData: boolean;
  isErrorMessage: boolean;
  userData: object;
  unsubscribe$ = new Subject();
  userUid: string;
  userToken: string;

  constructor(
    private router: Router,
    private authService: AuthserviceService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onSignUpUser(form: NgForm) {
    this.getUserData();
    let passWord = form.value["password"];
    let confirm_password = form.value["confirm-password"];
    let email = this.userData["email"];
    this.procesPasswordInformation(passWord, confirm_password);

    this.signUpWithFirebase(email, passWord, this.userData)
      .then(() => {
        this.signUpUser(passWord).then(() => {
          console.log("cool");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  procesPasswordInformation(password, confirm_password) {
    if (
      password === confirm_password &&
      password.match(this.passwordRegex) &&
      confirm_password.match(this.passwordRegex)
    ) {
      this.isCorrectPasswordData = true;
      this.isErrorMessage = false;
    } else {
      this.isCorrectPasswordData = false;
      this.isErrorMessage = true;
    }
  }

  getUserData() {
    let userProfilData = JSON.parse(
      sessionStorage.getItem("profilInformation")
    );
    let userPhoneNumber = JSON.parse(sessionStorage.getItem("phoneNumber"));

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
          console.log(this.userToken);
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

  async signUpUser(password) {
    let userData = {
      ...this.userData,
      password: password,
      user_uid: this.userUid,
      fcm_token: "N/A",
      web_token: this.userToken,
    };
    console.log(userData);
    this.authService
      .register(userData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log("register response", response);
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
