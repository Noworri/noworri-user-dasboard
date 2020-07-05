import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment.routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule } from 'ng-select';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    SelectModule,
    MatIconModule
  ]
})
export class PaymentModule { }
