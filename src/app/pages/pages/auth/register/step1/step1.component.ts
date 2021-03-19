import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { AuthserviceService } from "src/app/services/authservice.service";
import { GeoLocationService } from "src/app/services/geo-location.service";

@Component({
  selector: "vex-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.scss"],
})
export class Step1Component implements OnInit {
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

  ngOnInit(): void {
    this.form = this.fb.group({
      phoneNumber: ["", Validators.required],
      otpCode: ["", Validators.required],
    });
  }

  send() {
    this.router.navigate(["auth/register/step2"]);
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
