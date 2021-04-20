import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { UserSession } from "src/app/Models/interfaces";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { OtpVerificationService } from "src/app/services/otp-verification.service";
import { AuthserviceService } from "src/app/services/authservice.service";
import { catchError, isEmpty, take, takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "vex-user-profil",
  templateUrl: "./user-profil.component.html",
  styleUrls: ["./user-profil.component.scss"],
})
export class UserProfilComponent implements OnInit {
  hide = true;
  userData: UserSession;
  icEdit = icEdit;
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
  profilePicture: string;
  ppURL: string;
  fileToUpload: any;

  imageChangedEvent: any = "";
  croppedImage: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private snackBar: MatSnackBar
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
  }

  ngOnInit(): void {
    this.ppURL = this.userData.photo
      ? `https://noworri.com/api/public/uploads/images/pp/${this.userData.photo}`
      : `https://picsum.photos/200/300`;
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

  toggleUpdatePasswordModal() {
    this.showPaswordModal = !this.showPaswordModal;
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
          this.toggleUpdatePasswordModal();
        } else {
          const message = "Something went wrong!";
          this.openSnackbar(message);
        }
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

  toggleUpdateEmailModal() {
    this.isOTPSent = false;
    this.showEmailModal = !this.showEmailModal;
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

  onOtpInput(otp) {
    this.otp = otp;
  }

  sendVerificationCode() {
    const userData = {
      email: this.updateEmailForm.value["email"],
      id: this.userData.id,
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
          this.toggleUpdateEmailModal();
          this.isButtonActive = true;
        } else {
          this.isSentVerificationCode = false;
          console.log("Error", response["message"]);
          this.hasError = true;
          this.codeError = response["message"];
          this.isButtonActive = true;
        }
      });
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  UploadImage(){
    const file: File = this.fileToUpload;
    this.authService.uploadPhoto(file, this.userData.user_uid)
    .subscribe(
      (response) => {
        this.openSnackbar('Profile picture updated!');
        this.ppURL = `https://noworri.com/api/public/uploads/images/pp/${response['file']}`;
      }
    )
  }
  base64ToFile(data, filename) {
  
    const arrayData = data.split(',');
    const mime = arrayData[0].match(/:(.*?);/)[1];
    const bstr = atob(arrayData[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
  
  imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.fileToUpload = this.base64ToFile(
          event.base64,
          this.imageChangedEvent.target.files[0].name,
        )
        return this.fileToUpload
    }
}
