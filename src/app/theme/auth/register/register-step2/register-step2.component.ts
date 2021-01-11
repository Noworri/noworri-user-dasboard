import { GeoLocationService } from "./../../../../Service/geo-location.service";
import { OtpVerificationService } from "./../../../../Service/otp-verification.service";
import { RegisterService } from "./../register.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

const PROFILINFORMATION = "profilInformation";

@Component({
  selector: "app-register-step2",
  templateUrl: "./register-step2.component.html",
  styleUrls: ["./register-step2.component.scss"],
})
export class RegisterStep2Component implements OnInit {
  profilInformationRegex = /^[a-zA-Z ]*$/;
  emailProfilInformationRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  isErrorMessage: boolean;
  isCorrectProfilInformation: boolean;
  userContryName: any;
  locationData: any;
  contryCode: number;
  constructor(
    private router: Router,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit() {
    this.getUserContryName();
  }

  getUserContryName() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    }).then(() => {
      this.userContryName = this.locationData.country_name;
      this.contryCode = this.locationData.country_calling_code;
    });
  }

  onSubmitProfilInformation(form: NgForm) {
    let userProfilInformation = {
      name: form.value["lastname"],
      first_name: form.value["firstname"],
      email: form.value["email"],
      user_name: form.value["username"],
      photo: "",
      dailing_code: this.contryCode,
      country: this.userContryName,
      isBuyer: null,
      isSeller: null,
      account: null,
      type: "",
      country_code: "",
    };
    this.processProfilInformation(userProfilInformation);
    this.saveProfilInformation(userProfilInformation);
  }

  processProfilInformation(userProfilInformation) {
    if (
      userProfilInformation.name.match(this.profilInformationRegex) &&
      userProfilInformation.first_name.match(this.profilInformationRegex) &&
      userProfilInformation.user_name.match(this.profilInformationRegex) &&
      userProfilInformation.email.match(this.emailProfilInformationRegex)
    ) {
      this.isCorrectProfilInformation = true;
    } else {
      this.isErrorMessage = true;
    }
  }

  saveProfilInformation(userProfilInformation) {
    if (this.isCorrectProfilInformation == true) {
      sessionStorage.setItem(
        PROFILINFORMATION,
        JSON.stringify(userProfilInformation)
      );
      this.router.navigate(["/auth/register-step3"]);
    }
  }
}
