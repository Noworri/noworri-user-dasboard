import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { LoginComponent } from "./login.component";
import { VexRoutes } from "../../../../../@vex/interfaces/vex-route.interface";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { NewPasswordComponent } from "../forgot-password/new-password/new-password.component";

const routes: VexRoutes = [
  {
    path: "",
    component: LoginComponent,
    data: {
      title: "Login",
    },
  },
  {
    path: "auth/forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "auth/new-password",
    component: NewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class LoginRoutingModule {}
