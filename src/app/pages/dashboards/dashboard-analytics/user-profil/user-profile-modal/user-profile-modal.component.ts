import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemoDialogComponent } from 'src/app/pages/ui/components/components-overview/components/components-overview-dialogs/components-overview-dialogs.component';
import icClose from "@iconify/icons-ic/twotone-close";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, take } from 'rxjs/operators';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { USER_SESSION_KEY } from 'src/app/Models/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSession } from 'src/app/Models/interfaces';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  icClose = icClose;
  configs: any;
  userData: UserSession;
  isUpdating: boolean;
  showPaswordModal: boolean;
  showEmailModal: boolean;
  updatePasswordForm: FormGroup;
  updateEmailForm: FormGroup;
  inputType = "password";
  visible = false;
  codeError: string;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  isOTPSent = false;
  otp: string;
  isSentVerificationCode = false;
  isButtonActive = true;
  hasError: boolean;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private dialogRef: MatDialogRef<any>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.configs = data;
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);

  }

  ngOnInit(): void {
    this.setUpUpdatePasswordForm();
    this.setUpUpdateEmailForm();
  }

  setUpUpdatePasswordForm() {
    this.updatePasswordForm = this.formBuilder.group(
      {
        currentPswd: ["", Validators.required],
        newPswd: ["", Validators.required],
        confirmPswd: ["", Validators.required],
      },
      {
        validator: this.validatePasswords,
      }
    );
  }

  setUpUpdateEmailForm() {
    this.updateEmailForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onOtpInput(otp) {
    this.otp = otp;
  }

  sendVerificationCode() {
    const userData = {
      email: this.updateEmailForm.value["email"],
      user_id: this.userData.user_uid,
    };
    // this.isLoadingButton = true;
    this.isButtonActive = false;
    this.authService
      .sendEmailVerificationCode(userData)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.isOTPSent = true;
          this.isSentVerificationCode = true;
          // this.isLoadingButton = false;
          this.isButtonActive = true;
        } else {
          this.codeError = response["message"];
        }
      });
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }

  
  updatePassword() {
    const password = this.updatePasswordForm.value["currentPswd"];
    this.authService
      .login(this.userData.mobile_phone, password)
      .pipe(take(1))
      .subscribe(
        (response) => {
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
          this.close('No answer');
          this.logout();
        } else {
          const message = "Something went wrong!";
          this.openSnackbar(message);
        }
      });
  }

  logout()
  {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
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

  verifyOTP() {
    // this.isLoadingButton = true;
    this.isButtonActive = false;
    const verificationCode = this.otp;
    this.authService
      .verifyEmail(this.userData.user_uid, verificationCode)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.openSnackbar(response["message"]);
          this.isButtonActive = true;
          const data = this.userData;
          data.email = this.updateEmailForm.value["email"];
          const newUserData = JSON.stringify(data);
          localStorage.setItem(USER_SESSION_KEY, newUserData);
          location.reload(true);  
        } else {
          this.isSentVerificationCode = false;
          console.log("Error", response["message"]);
          this.hasError = true;
          this.codeError = response["message"];
          this.isButtonActive = true;
        }
      });
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
