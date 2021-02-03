import { RegisterStep1Component } from "./register/register-step1/register-step1.component";
import { AngularFireModule } from "@angular/fire";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatCardModule,
  MatCheckboxModule,
  MatOptionModule,
} from "@angular/material";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { Forgot2Component } from './forgot2/forgot2.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatCardModule,
    MatCheckboxModule,
    AngularFireModule,
    RegisterStep1Component,
  ],
  declarations: [Forgot2Component],
})
export class AuthModule {}
