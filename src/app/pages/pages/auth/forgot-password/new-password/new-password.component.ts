import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { OtpVerificationService } from 'src/app/services/otp-verification.service';
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { UserSession } from 'src/app/Models/interfaces';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  @Input()
  userData: UserSession;
  
  
  showPaswordModal: boolean;
  showEmailModal: boolean;
  updatePasswordForm: FormGroup;
  updateEmailForm: FormGroup;
  inputType = "password";
  visible = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  isOTPSent = false;
  otp: string;
  isSentVerificationCode = false;
  isButtonActive = true;
  hasError = false;
  codeError: string;
  profilePicture: string
  
  constructor(
    private otpverificationService: OtpVerificationService,
    private authService: AuthserviceService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setUpUpdatePasswordForm();
  }

  updatePassword() {
    const password = this.updatePasswordForm.value["currentPswd"];
    this.authService
      .login(this.userData.mobile_phone, password)
      .pipe(take(1))
      .subscribe((response) => {
        if (!response.error || response.error !== "Unauthorized") {
          this.processUpdatePassword();
        } else {
          this.hasError = true;
          this.codeError = "Wrong password";
        }
      },
      catchError((error: HttpErrorResponse) => {
          this.hasError = true;
          this.codeError = "Wrong password";
        return throwError(error);
      })
      );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.changeDetector.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.changeDetector.markForCheck();
    }
  }

  setUpUpdatePasswordForm() {
    this.updatePasswordForm = this.formBuilder.group({
      currentPswd: ["", Validators.required],
      newPswd: ["", Validators.required],
      confirmPswd: ["", Validators.required],
    },
    {
      validator: this.validatePasswords
    }
    );
  }

  processUpdatePassword() {
    const passwordData = {
      uid: this.userData.user_uid,
      password: this.updatePasswordForm.value["newPswd"],
    };
    this.authService
      .updatePassword(passwordData)
      .pipe(take(1))
      .subscribe((response) => {
        if (Object.keys(response).length) {
          const message = "Password Updated Successfully!";
          this.openSnackbar(message);
          this.router.navigate(["auth/login"]);
        } else {
          const message = "Something went wrong!";
          this.openSnackbar(message);
        }
      });
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }

  validatePasswords(updatePasswordForm: FormGroup): ValidationErrors {
    const password = updatePasswordForm.value["newPswd"];
    const confirmPassword = updatePasswordForm.value["confirmPswd"];
    if (confirmPassword === password) {
      return null;
    } else {
      return {
        passwordsDoNotMatch: true,
      };
    }
  }

}
