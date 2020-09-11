import { from } from 'rxjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule, MatRadioGroup, MatRadioButton, MatOptionModule, MatSelectModule } from '@angular/material';


@NgModule({
  // declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class RegisterModule { }
