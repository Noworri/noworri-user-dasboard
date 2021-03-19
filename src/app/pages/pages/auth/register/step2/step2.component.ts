import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";

@Component({
  selector: "vex-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit {
  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
    });
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
  send() {
    this.router.navigate(["auth/register/step3"]);
  }
}
