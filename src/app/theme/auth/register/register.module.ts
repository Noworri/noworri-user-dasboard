import { from } from "rxjs";
import { AngularFireModule } from "@angular/fire";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { MatInputModule } from "@angular/material/input";
import {
  MatFormFieldModule,
  MatRadioGroup,
  MatRadioButton,
  MatOptionModule,
  MatSelectModule,
} from "@angular/material";
import { RegisterStep1Component } from "./register-step1/register-step1.component";
import { RegisterStep2Component } from "./register-step2/register-step2.component";
import { RegisterStep3Component } from "./register-step3/register-step3.component";

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
    AngularFireModule,
    RegisterStep1Component,
  ],
  declarations: [
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
  ],
})
export class RegisterModule {}
