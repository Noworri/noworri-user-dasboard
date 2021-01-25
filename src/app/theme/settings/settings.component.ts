import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Service/authservice.service';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
  isDisplayHoldEmail=true;
  isDisplayNewnewEmail:boolean;
  isDisplayHolPassword=true;
  isDisplayNewPassword:boolean;

  constructor (private modalService: BsModalService, private router: Router, private authService: AuthserviceService) {
    this.sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = this.sessionData.first_name;
    this.email = this.sessionData.email;
    this.name = this.sessionData.name;
    this.mobile_phone = this.sessionData.mobile_phone;
    this.userID = this.sessionData.user_uid;
    // this.ppSrc =
    //   this.sessionData.photo === null
    //     ? './../../../assets/profilPhotoAnimation.gif'
    //     : `https://noworri.com/api/public/uploads/images/pp/${sessionData.photo}`;

  }

  ngOnInit () {
    this.ppSrc =
      this.sessionData.photo === null
        ? './../../../assets/profilPhotoAnimation.gif'
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
            console.log(response)
            this.ppSrc = `https://noworri.com/api/public/uploads/images/pp/${response.file}`;
            // window.location.href = 'Settings';
          }
        },
        (error) => {
          console.log('Error %j', error.message);
        }
      );
  }

  upload(fileData: FileList) {
      this.file = fileData.item(0);
      this.hasFile = true;
      this.onChangePP()
    }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
  onChangeNewEmail(){
    this.isDisplayHoldEmail=false;
    this.isDisplayNewnewEmail=true
  }
  onChangeNewPassWord(){
    this.isDisplayHolPassword=false;
    this.isDisplayNewPassword=true
  }
}
