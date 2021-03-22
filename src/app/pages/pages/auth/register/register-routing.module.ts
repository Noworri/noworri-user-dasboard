import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { Step1Component } from "./step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { Step3Component } from "./step3/step3.component";

const routes: Routes = [
  {
    path: "",
    redirectTo:"step1"
  },
  {
    path: "step1",
    component: Step1Component,
  },
  {
    path: "step2",
    component: Step2Component,
  },
  {
    path: "step3",
    component: Step3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class RegisterRoutingModule {}
