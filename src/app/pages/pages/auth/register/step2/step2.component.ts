import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { COUNTRIES } from "src/app/Models/constants";
import { GeoLocationService } from "src/app/services/geo-location.service";

@Component({
  selector: "vex-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit {
  form: FormGroup;

  profilInformationRegex = /^[a-zA-Z-']*$/;
  emailProfilInformationRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  isErrorMessage: boolean;
  isCorrectProfilInformation: boolean;
  countryName: any;
  locationData: any;
  countryDailingCode: number;
  countryCode: string;
  countriesList = COUNTRIES;
  validationMessages = {
    firstName: {
      required: "First name  is required.",
      pattern: "Only characters allowed",
    },
    lastName: {
      required: "Last Name is required",
      pattern: "Only characters allowed",
    },
    userName: {
      required: "User Name  is required.",
    },
    country: {
      required: "Country is required",
      pattern: "Please enter a valid Country name",
    },
    email: {
      required: "Email  is required.",
      email: "Please enter a valid email",
    }
  };

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private geoLocationService: GeoLocationService,
   
  ) {
    const phoneNumber = sessionStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      router.navigate(['auth/register/step1']);
    }
  }

  ngOnInit(): void {
    this.getUserCountryName();
    this.form = this.fb.group({
      lastName: ["", [Validators.required, Validators.pattern(this.profilInformationRegex)]],
      firstName: ["", [Validators.required, Validators.pattern(this.profilInformationRegex)]],
      email: ["", [Validators.required, Validators.email]],
      // userName: [""],
      country: [""],
    });

    this.form.get('country').patchValue(this.countryName);
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

  getUserCountryName() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    }).then(() => {
      this.countryDailingCode = this.locationData.country_calling_code;
      this.countryCode = this.locationData.country_code;
    });
  }

  sendUserData() {
    let userProfilInformation = {
      name: this.form.value["lastName"],
      first_name: this.form.value["firstName"],
      email: this.form.value["email"],
      user_name: "",
      photo: "",
      dailing_code: this.countryDailingCode,
      country: this.form.value['country'],
      isBuyer: null,
      isSeller: null,
      account: null,
      type: "",
      country_code: this.countryCode,
    };
    this.saveUserData(userProfilInformation);
  }

  saveUserData(userProfilInformation) {
      sessionStorage.setItem(
        'profilInformation',
        JSON.stringify(userProfilInformation)
      );
      this.router.navigate(["/auth/register/step3"]);
  }
}
