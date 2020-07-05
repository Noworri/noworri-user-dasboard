
import { from } from 'rxjs'
import { RegisterService } from './register.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../../core/auth/auth.service'
import { countryISO } from '../../../shared/utils/country'
import * as firebase from 'firebase'
import { NgForm } from '@angular/forms'
import { setTNodeAndViewData } from '@angular/core/src/render3/state'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  allowedCountries = countryISO
  registerForm: FormGroup
  error: string


  windowsReff: any
  vericationCode: any
  user: any
  confirmation: {}
  ContryCode = '+233'

  mobile_phone: string
  lastname: string
  firstname: string
  email: string
  username: string
  password: string
  password_confirm: string

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private RegisterService: RegisterService,
    
    

  ) {}
  ngOnInit () {
    this.windowsReff = this.RegisterService.WindowsRef
    this.windowsReff.recaptchartVeifier = new firebase.auth.RecaptchaVerifier(
      'recapcha-container'
    )
    this.windowsReff.recaptchartVeifier.render()
  }

  onMobileNumberSubmit (form: NgForm) {
    this.mobile_phone = this.ContryCode + form.value['mobile_phone']

    const ApVerifer = this.windowsReff.recaptchartVeifier
    firebase
      .auth()
      .signInWithPhoneNumber(this.mobile_phone, ApVerifer)
      .then(confimations => {
        this.windowsReff.confimationResult = confimations
      })
  }

  SubmitVerificationCode (form: NgForm) {
    var VerificationCode = form.value['VerificationCode']
    this.windowsReff.confimationResult.confirm(VerificationCode).then(() => {
    }).catch((error)=>{
      this.router.navigate(['/auth/login'])
    })
  }

  GetProfilInformation (form: NgForm) {
    this.lastname = form.value['lastname']
    this.firstname = form.value['firstname']
    this.email = form.value['Email']
    this.username = form.value['Username']
  }

  onRegisterSubmit (form: NgForm) {
    this.password = form.value['password']
    this.password_confirm = form.value['confirm-password']
    var mobilPhone=this.mobile_phone
    var lastname=this.lastname
    var firstname=this.firstname
    var Email=this.email
    var username=this.username
    var password=this.password

    if (this.password!==this.password_confirm) {
      return null
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().onAuthStateChanged(user => {
            firebase.firestore().collection('users').doc(user.uid).set({
              mobilPhone,
              lastname,
              firstname,
              Email,
              username,
              password
            }).then(()=>{
              this.router.navigate(['home'])
            }).catch((error)=>{
              setTimeout(()=>{
                this.router.navigate(['/auth/login'])
              },4000)
            })
          })
        })
    }
  }
}
