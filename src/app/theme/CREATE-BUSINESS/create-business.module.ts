import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreateBusinessRoutingModule } from "./create-business-routing.module";
@NgModule({
  imports: [
    CommonModule,
    CreateBusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateBusinessModule {}
