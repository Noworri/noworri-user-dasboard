import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { HighlightModule } from 'src/@vex/components/highlight/highlight.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [ForgotPasswordComponent, NewPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    IconModule,
    MatIconModule,
    NgOtpInputModule,
    HighlightModule,
    MatSnackBarModule
  ]
})
export class ForgotPasswordModule {
}
