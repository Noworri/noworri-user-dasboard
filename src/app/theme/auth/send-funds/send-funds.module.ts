
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendFundsRoutingModule } from './send-funds-routing';
import { SendFundsComponent } from './send-funds.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';



@NgModule({
  declarations: [SendFundsComponent],
  imports: [
    CommonModule,
    SendFundsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    
  ]
})
export class SendFundsModule { }
