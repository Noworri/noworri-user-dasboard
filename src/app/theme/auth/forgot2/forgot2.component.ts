import { HttpClient } from "@angular/common/http";
import { AuthService } from "./../../../core/auth/auth.service";
import { AuthserviceService } from "src/app/Service/authservice.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-forgot2",
  templateUrl: "./forgot2.component.html",
  styleUrls: ["./forgot2.component.scss"],
})
export class Forgot2Component implements OnInit {
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  isCorrectPasswordData: boolean;
  isErrorMessage: boolean;
  constructor(
    private router: Router,
    private authService: AuthserviceService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onSubmitNewPassword(form: NgForm) {
    let passWord = form.value["passWord"];
    let confirmPassWord = form.value["confirmPassword"];
    let phoneNumber = JSON.stringify(sessionStorage.getItem("phoneNumber"));
    let phoneNumber3 = "514213072";
    this.procesPasswordInformation(passWord, confirmPassWord);

    if (this.isCorrectPasswordData === true) {
      this.getUserData(phoneNumber3);
    }
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

  async getUserData(phoneNumber) {
    this.http
      .post("https://api.noworri.com/api/getuserbyphone", phoneNumber)
      .subscribe((d) => {
        console.log(d);
      });
  }
}
