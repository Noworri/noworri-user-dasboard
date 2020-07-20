import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { InternationalPhoneNumber2Module } from 'ngx-international-phone-number2';
import {MatInputModule} from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  // declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    InternationalPhoneNumber2Module,
    MatInputModule,
    HttpClientModule
  ]
})
export class LoginModule { }
