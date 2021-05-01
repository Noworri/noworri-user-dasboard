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
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserProfileModalComponent } from "./user-profile-modal/user-profile-modal.component";

@Component({
  selector: "vex-user-profil",
  templateUrl: "./user-profil.component.html",
  styleUrls: ["./user-profil.component.scss"],
})
export class UserProfilComponent implements OnInit {
  hide = true;
  userData: UserSession;
  icEdit = icEdit;
  isUpdating: boolean;
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
  actionResult: any;

  imageChangedEvent: any = "";
  croppedImage: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
  }

  ngOnInit(): void {
    this.ppURL = this.userData.photo
      ? `https://noworri.com/api/public/uploads/images/pp/${this.userData.photo}`
      : `https://picsum.photos/200/300`;
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

  openDialog(showEmailModal, showPaswordModal) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  false;
    dialogConfig.data = {
      dialogHeader: showEmailModal ? 'UPDATE EMAIL' : 'UPDATE PASSWORD',
      buttonCancel: 'CANCEL',
      buttonConfirm: 'CONFRIM',
      showPaswordModal,
      showEmailModal
    }
    this.dialog.open(UserProfileModalComponent, dialogConfig).afterClosed().subscribe(result => {
      this.actionResult = result;
      if(result === 'Yes') {
        console.log('confirmed');
        // this.withdraw();
      }
    });
  }


  UploadImage(){
    const file: File = this.fileToUpload;
    this.isUpdating = true
    this.authService.uploadPhoto(file, this.userData.user_uid)
    .subscribe(
      (response) => {
        this.openSnackbar('Profile picture updated!');
        this.isUpdating = false;
        const data = this.userData;
        data.photo = response['file'];
        const newUserData = JSON.stringify(data);
        localStorage.setItem(USER_SESSION_KEY, newUserData);
        location.reload(true);
      }
    ),
    catchError((error) => {
      this.openSnackbar('Format no supported!');
      return throwError(error.message);
    })
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
