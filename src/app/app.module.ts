import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HttpClientModule } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { IntlTelInputNgModule } from "intl-tel-input-ng";
import { NgOtpInputModule } from "ng-otp-input";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgOtpInputModule,
    MatSlideToggleModule,

    // Vex
    VexModule,
    CustomLayoutModule,
    
    ImageCropperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
