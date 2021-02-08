import { Component, OnInit } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/Service/authservice.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NgForm } from "@angular/forms";

const SESSION_STORAGE_KEY = "noworri-user-session";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  unsubscribe$ = new Subject();

  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  first_name: string;
  name: string;
  mobile_phone: string;
  email: string;
  file: File;
  ppSrc: string;
  userID: string;
  sessionData: any;
  hasFile: boolean;
  isDisplayHoldEmail = true;
  isDisplayNewnewEmail: boolean;
  isDisplayHolPassword = true;
  isDisplayNewPassword: boolean;
  id: string;

  constructor(
    private authService: AuthserviceService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = this.sessionData.first_name;
    this.email = this.sessionData.email;
    this.name = this.sessionData.name;
    this.mobile_phone = this.sessionData.mobile_phone;
    this.userID = this.sessionData.user_uid;
    this.id = this.sessionData.id;
    // this.ppSrc =
    //   this.sessionData.photo === null
    //     ? './../../../assets/profilPhotoAnimation.gif'
    //     : `https://noworri.com/api/public/uploads/images/pp/${sessionData.photo}`;
  }

  ngOnInit() {
    this.ppSrc =
      this.sessionData.photo === null
        ? "./../../../assets/profilPhotoAnimation.gif"
        : `https://noworri.com/api/public/uploads/images/pp/${this.sessionData.photo}`;
  }

  onChangePP() {
    if (this.file) {
      this.uploadFile(this.file);
    } else {
      this.hasFile = false;
    }
    //  this.uploadFile(this.file)
  }

  uploadFile(file) {
    this.authService.uploadFile(file, this.userID).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.ppSrc = `https://noworri.com/api/public/uploads/images/pp/${response.file}`;
          // window.location.href = 'Settings';
        }
      },
      (error) => {
        console.log("Error %j", error.message);
      }
    );
  }

  upload(fileData: FileList) {
    this.file = fileData.item(0);
    this.hasFile = true;
    this.onChangePP();
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(["/auth/login"]);
    }, 2000);
  }
  changeNewEmailButton() {
    this.isDisplayHoldEmail = false;
    this.isDisplayNewnewEmail = true;
  }
  changeNewPassWordButton() {
    this.isDisplayHolPassword = false;
    this.isDisplayNewPassword = true;
  }

  onAupdateProfilData() {}

  saveChanges(form: NgForm) {
    const email = form.value["email"];
    const password = form.value["password"];
    if (email.length) {
      this.updateEmail(email);
    }
    if (password.length) {
      this.updatePassword(password);
    }
  }

  updateEmail(email) {
    const data = {
      id: this.id,
      email: email,
    };
    this.authService
      .updateEmail(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        return response;
      });
  }

  updatePassword(password) {
    const data = {
      id: this.id,
      password: password,
    };
    this.authService
      .updateEmail(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        return response;
      });
  }
}
