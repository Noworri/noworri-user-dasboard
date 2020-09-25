import { from, Subject } from 'rxjs';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { countryISO } from '../../../shared/utils/country';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  allowedCountries = countryISO;
  registerForm: FormGroup;
  error: string;
  unsubscribe$ = new Subject();

  windowsRef: any;
  verificationCode: any;
  user: any;
  confirmation: {};
  sessionInfo: any;

  mobile_phone: string;
  lastName: string;
  firstName: string;
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  userData: object;
  file: File;
  codeError: string;

  country: string;
  uid: string;
  isBuyer: number;
  isSeller: number;
  type: any;
  account: number;
  code: any;
  photo: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private authService: AuthenticationService,
    private registerService: RegisterService
  ) {}
  ngOnInit() {
    this.windowsRef = this.registerService.WindowsRef;
    this.windowsRef.recaptchartVerifier = new firebase.auth.RecaptchaVerifier(
      'recapcha-container'
    );
    this.windowsRef.recaptchartVerifier.render();
  }

  onMobileNumberSubmit(form: NgForm) {
    this.mobile_phone = `${form.value['countryCode']}${form.value['mobile_phone']}`;
    console.log(this.mobile_phone);

    const ApVerifier = this.windowsRef.recaptchartVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(this.mobile_phone, ApVerifier)
      .then((confirmationResult) => {
        this.windowsRef.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log('firebase error', error);
      });
  }

  SubmitVerificationCode(form: NgForm) {
    const VerificationCode = form.value['VerificationCode'];
    this.windowsRef.confirmationResult
      .confirm(VerificationCode)
      .then((sessionInfo) => {
        this.sessionInfo = sessionInfo;
      })
      .catch((error) => {
        console.log('Error', error.message);
        this.codeError = error.message;
      });
  }

  GetProfileInformation(form: NgForm) {
    this.lastName = form.value['lastname'];
    this.firstName = form.value['firstname'];
    this.email = form.value['email'];
    this.username = form.value['username'];
    this.photo = '';
    this.code = '';
    this.country = form.value['country'];
    this.isBuyer = null;
    this.isSeller = null;
    this.account = null;
    this.type = '';
  }

  registerUser(userData) {
    this.authService
      .register(userData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log('register response', response);
        return response;
      });
  }

  onRegisterSubmit(form: NgForm) {
    this.password = form.value['password'];
    this.password_confirm = form.value['confirm-password'];
    const mobilPhone = this.mobile_phone;
    const lastname = this.lastName;
    const firstname = this.firstName;
    const Email = this.email;
    const username = this.username;
    const password = this.password;

    if (this.password !== this.password_confirm) {
      return null;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                mobilPhone,
                lastname,
                firstname,
                Email,
                username,
                password,
              })
              .then((response: any) => {
                console.log('createUserWithEmailAndPassword', response);
                this.userData = {
                  photo: this.photo,
                  mobile: mobilPhone,
                  lastName: lastname,
                  firstName: firstname,
                  email: Email,
                  userName: username,
                  password: password,
                  country: this.country,
                  uid: response.localId,
                  isBuyer: this.isBuyer,
                  isSeller: this.isSeller,
                  type: this.type,
                  account: this.account,
                  code: this.code,
                };
                console.log('userData', this.userData);
                this.registerUser(this.userData);
                this.router.navigate(['home']);
              })
              .catch((error) => {
                setTimeout(() => {
                  this.codeError = error.message;
                  this.router.navigate(['/auth/login']);
                }, 4000);
              });
          });
        });
    }
  }
}
