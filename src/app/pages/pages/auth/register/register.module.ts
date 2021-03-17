import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconModule } from '@visurel/iconify-angular';
import { IntlTelInputNgModule } from 'intl-tel-input-ng';
import { ArchwizardModule } from 'angular-archwizard';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';


@NgModule({
  declarations: [RegisterComponent, Step1Component, Step2Component, Step3Component],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    // MatLabel,
    // IconModule,
    // IntlTelInputNgModule,
    // ArchwizardModule,
    // ReactiveFormsModule,
    // MatInputModule,
    // MatIconModule,
    // MatSnackBarModule,
    // IconModule,
    // MatTooltipModule,
    // MatButtonModule,
    // MatCheckboxModule,
  ]
})
export class RegisterModule {
}
