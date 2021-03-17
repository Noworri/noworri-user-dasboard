import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { AuthserviceService } from "src/app/services/authservice.service";
import { GeoLocationService } from "src/app/services/geo-location.service";
import firebase from "firebase";
import { take } from "rxjs/operators";

@Component({
  selector: "vex-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [fadeInUp400ms],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  send() {
    this.router.navigate(["/"]);
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

  navigate(route) {
    this.router.navigate([route])
  }
}
