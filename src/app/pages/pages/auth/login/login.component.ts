import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { countryISO, SESSION_STORAGE_KEY, USER_SESSION_KEY } from 'src/app/Models/constants';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserReference } from 'src/app/services/reference-data.interface';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  isValidCountry = true;
  countryData: any;
  prefixContryCode: string;
  locationData: any;
  waitingDisplayInput: boolean;
  realPhoneNumber: string;
  phoneNumberReg = /^\d+$/;
  isCorrectPhoneEntry: boolean;
  loading = false;
  returnUrl: string;
  error: string;
  allowedCountries = countryISO;
  isValidUser = true;
  isValidating = false;
  password: string;
  sessionResponse : any;

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authService: AuthserviceService,
              private geoLocationService: GeoLocationService
  ) {
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const userData = localStorage.getItem(USER_SESSION_KEY);
    if (userData && sessionData) {
      router.navigate(["home"]);
    }
    this.getLocationData();
  }

  ngOnInit() {
    this.form = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  getLocationData() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    })
      .then(() => {
        if (!this.locationData) {
          this.waitingDisplayInput = false;
        } else {
          this.waitingDisplayInput = true;
          this.countryData = {
            preferredCountries: [`${this.locationData}`],
            localizedCountries: { ng: "Nigeria", gh: "Ghana" },
            onlyCountries: ["GH", "NG"],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === "GH" ||
          this.locationData.country_code === "NG"
        ) {
          this.prefixContryCode = this.locationData.country_calling_code;
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixContryCode = "+233";
        }
      });
  }

  send() {
    this.router.navigate(['/']);
    this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
      duration: 10000
    });
  }

  login() {
    this.ProcessphoneNumber();
    this.password = this.form.value["password"];
    if (this.isCorrectPhoneEntry == true && this.password) {
      this.isValidating = true;
      this.authService
        .login(this.realPhoneNumber, this.password)
        .pipe(take(1))
        .subscribe(
          (response: UserReference) => {
            this.isValidating = false;
            if (!response.error || response.error !== "Unauthorized") {
              this.sessionResponse = {
                first_name: response.currentUser.first_name,
                email: response.currentUser.email,
                mobile_phone: response.currentUser.mobile_phone,
                user_uid: response.currentUser.user_uid,
                photo: response.currentUser.photo,
                name: response.currentUser.name,
                status: response.currentUser.status,
                id: response.currentUser.id,
              };
              const sessionData = {
                token: response.currentUser.token,
              };
              const sessionStorageData = JSON.stringify(sessionData);
              sessionStorage.setItem(SESSION_STORAGE_KEY, sessionStorageData);
              const userData = JSON.stringify(this.sessionResponse);
              localStorage.setItem(USER_SESSION_KEY, userData);
              this.router.navigate(["dashboards"]);
            } else {
              this.isValidating = false;
              this.isValidUser = false;  
            }
          },
          (error) => {
            this.isValidating = false;
            this.isValidUser = false;
          }
        );
    } else {
      this.isValidating = false;
    }
  }

  ProcessphoneNumber() {
    let rawPhoneNumber = this.form.value['phoneNumber'];
    let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
    if (phoneNumberWithoutSpace.match(this.phoneNumberReg)) {
      if (phoneNumberWithoutSpace.charAt(0) === "0") {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber =
          this.prefixContryCode + phoneNumberWithoutSpace.substr(1);
      } else {
        this.isCorrectPhoneEntry = true;
        this.realPhoneNumber = this.prefixContryCode + phoneNumberWithoutSpace;
      }
    } else {
      this.isValidUser = false;
    }
  }


  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
