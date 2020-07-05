import { AuthModule } from './../auth.module';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { countryISO } from '../../../shared/utils/country';
import { Url } from 'url';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error: string;
  allowedCountries = countryISO;

   phone_number:any
   password:any

   Url='https://api.noworri.com/api/login'

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
   
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      phone_number: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

 OnLogin(){
  this.phone_number=this.loginForm.get('phone_number').value
  this.password=this.loginForm.get('password').value
  this.http.post(this.Url,{
    body: {
      "mobile_phone": this.phone_number,
      "password" : this.password
    }
  }).subscribe((rece)=>{
    console.log(rece)
  })
 }
}
