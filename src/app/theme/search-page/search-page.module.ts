import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio'
import { InternationalPhoneNumber2Module } from 'ngx-international-phone-number2';




import{FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumber2Module

  ]
})
export class SearchPageModule { }
