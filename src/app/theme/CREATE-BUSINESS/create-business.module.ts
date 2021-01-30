import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CREATEBUSINESSRoutingModule } from './create-business-routing.module';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

@NgModule({
  declarations: [Step1Component, Step2Component, Step3Component],
  imports: [
    CommonModule,
    CREATEBUSINESSRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CREATEBUSINESSModule { }
