import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";

const OTP_AUTORIZATION = "autorization";

@Injectable({
  providedIn: "root",
})
export class OtpVerificationService {
  windRef: any;
  sessionInfo: any;
  hasError: boolean;
  codeError: boolean;

  constructor(private router: Router) {}

  onInitRecapChat() {
    this.windRef = this.windowRef;
    this.windRef.recaptchartVerifier = new firebase.default.auth.RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
      }
    );
    this.windRef.recaptchartVerifier.render();
  }

  async sendVerificationCode(realPhonenumber) {
    const applicationVerifier = this.windRef.recaptchartVerifier;
    await firebase.default
      .auth()
      .signInWithPhoneNumber(realPhonenumber, applicationVerifier)
      .then((res) => {
        this.windRef.confirmationResult = res;
        // this.sendVerificationCodeSubject.next(res);
      })
      .catch((error) => {
        console.log("firebase error", error);
      });
  }
  get windowRef() {
    return window;
  }

  async submitVerificationCode(VerificationCode) {
    await this.windRef.confirmationResult
      .confirm(VerificationCode)
      .then((sessionInfo) => {
        this.sessionInfo = sessionInfo;
      });
  }
}
