import { Step3Component } from './theme/create-business/step3/step3.component';
import { Step2Component } from './theme/create-business/step2/step2.component';
import { Step1Component } from './theme/create-business/step1/step1.component';


import { Forgot2Component } from "./theme/auth/forgot2/forgot2.component";
import { ForgotComponent } from "./theme/auth/forgot/forgot.component";
import { RegisterStep3Component } from "./theme/auth/register/register-step3/register-step3.component";
import { RegisterStep2Component } from "./theme/auth/register/register-step2/register-step2.component";
import { RegisterStep1Component } from "./theme/auth/register/register-step1/register-step1.component";
import { PayementsComponent } from "./theme/PAYEMENTPART/payements/payements.component";
import { ResultPageComponent } from "./theme/result-page/result-page.component";

import { PrivacyComponent } from "./theme/privacy/privacy.component";
import { LandingPageComponent } from "./theme/landing-page/landing-page.component";
import { SearchPageComponent } from "./theme/search-page/search-page.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./layout/admin/admin.component";
import { AuthComponent } from "./layout/auth/auth.component";

import { DisputPageComponent } from "./theme/disput-page/disput-page.component";
import { HomeComponent } from "./theme/home/home.component";
import { TransactionsComponent } from "./theme/transactions/transactions.component";
import { PaymentComponent } from "./theme/payment/payment.component";
import { ApiIntegrationComponent } from "./theme/api-integration/api-integration.component";
import { SettingsComponent } from "./theme/settings/settings.component";
import { LoginComponent } from "./theme/auth/login/login.component";
import { RegisterComponent } from "./theme/auth/register/register.component";
import { EscrowServiceBuyerstep1Component } from "./theme/ESCROWPART/escrow-service-buyerstep1/escrow-service-buyerstep1.component";
import { EscrowServiceBuyerstep2Component } from "./theme/ESCROWPART/escrow-service-buyerstep2/escrow-service-buyerstep2.component";
import { EscrowServiceSellerstep1Component } from "./theme/ESCROWPART/escrow-service-sellerstep1/escrow-service-sellerstep1.component";
import { EscrowServiceSellerstep2Component } from "./theme/ESCROWPART/escrow-service-sellerstep2/escrow-service-sellerstep2.component";
import { EscrowMerchandiseBuyerstep1Component } from "./theme/ESCROWPART/escrow-merchandise-buyerstep1/escrow-merchandise-buyerstep1.component";
import { EscrowMerchandiseBuyerstep2Component } from "./theme/ESCROWPART/escrow-merchandise-buyerstep2/escrow-merchandise-buyerstep2.component";
import { EscrowMerchandiseSellerstep1Component } from "./theme/ESCROWPART/escrow-merchandise-sellerstep1/escrow-merchandise-sellerstep1.component";
import { EscrowMerchandiseSellerstep2Component } from "./theme/ESCROWPART/escrow-merchandise-sellerstep2/escrow-merchandise-sellerstep2.component";
import { BuyerServicesContratComponent } from "./theme/buyer-services-contrat/buyer-services-contrat.component";
import { SellerServicesContratComponent } from "./theme/seller-services-contrat/seller-services-contrat.component";
import { SellerMerchandiseContratComponent } from "./theme/seller-merchandise-contrat/seller-merchandise-contrat.component";
import { BuyerMerchandiseContratComponent } from "./theme/buyer-merchandise-contrat/buyer-merchandise-contrat.component";
import { HomegetstrustedComponent } from "./theme/homegetstrusted/homegetstrusted.component";
import { FormgetstrustedComponent } from "./theme/formgetstrusted/formgetstrusted.component";
import { IdentityVerificationComponent } from "./theme/identity-verification/identity-verification.component";
import { SelfiVericationComponent } from "./theme/selfi-verication/selfi-verication.component";
import { GetstrutedRecapComponent } from "./theme/getstruted-recap/getstruted-recap.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    children: [
      {
        path: "register-step1",
        component: RegisterStep1Component,
      },
      {
        path: "register-step2",
        component: RegisterStep2Component,
      },
      {
        path: "register-step3",
        component: RegisterStep3Component,
      },

      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "forgot",
        component: ForgotComponent,
      },
      {
        path: "forgot2",
        component: Forgot2Component,
      },
    ],
  },
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "transactions",
        component: TransactionsComponent,
      },
      {
        path: "payments",
        component: PaymentComponent,
      },

      // ---------for escrow-------//
      {
        path: "escrowservicebuyerstep1",
        component: EscrowServiceBuyerstep1Component,
      },
      {
        path: "escrowservicebuyerstep2",
        component: EscrowServiceBuyerstep2Component,
      },
      {
        path: "escrowservicesellerstep1",
        component: EscrowServiceSellerstep1Component,
      },
      {
        path: "escrowservicesellerstep2",
        component: EscrowServiceSellerstep2Component,
      },
      {
        path: "escrowmerchandisebuyerstep1",
        component: EscrowMerchandiseBuyerstep1Component,
      },
      {
        path: "escrowmerchandisebuyerstep2",
        component: EscrowMerchandiseBuyerstep2Component,
      },
      {
        path: "escrowmerchandisesellerstep1",
        component: EscrowMerchandiseSellerstep1Component,
      },
      {
        path: "escrowmerchandisesellerstep2",
        component: EscrowMerchandiseSellerstep2Component,
      },

      // ------for payement---------//
      {
        path: "payement",
        component: PayementsComponent,
      },
      //------//
      {
        path: "buyerservicescontrat/:transactionKey",
        component: BuyerServicesContratComponent,
      },
      {
        path: "sellerservicescontrat/:transactionKey",
        component: SellerServicesContratComponent,
      },
      {
        path: "sellermerchandisecontrat/:transactionKey",
        component: SellerMerchandiseContratComponent,
      },
      {
        path: "buyermerchandisecontrat/:transactionKey",
        component: BuyerMerchandiseContratComponent,
      },

      {
        path: "homegetstrusted",
        component: HomegetstrustedComponent,
      },
      {
        path: "formgetstruted",
        component: FormgetstrustedComponent,
      },
      {
        path: "identityverification",
        component: IdentityVerificationComponent,
      },
      {
        path: "selfiverification",
        component: SelfiVericationComponent,
      },
      {
        path: "getstustedrecap",
        component: GetstrutedRecapComponent,
      },
      {
        path: "git",
        component: GetstrutedRecapComponent,
      },
      {
        path: "api",
        component: ApiIntegrationComponent,
      },
      {
        path: "Settings",
        component: SettingsComponent,
      },
      //  for creating business //
      {
        path: "create-business",
        children: [
          {
            path: "step1",
            component: Step1Component,
          },
          {
            path: "step2",
            component: Step2Component
          },
          {
            path: "step3",
            component: Step3Component
          },
        ],
      },

    ],
  },


  {
    path: "whatnoworri",
    component: LandingPageComponent,
  },
  {
    path: "privacy",
    component: PrivacyComponent,
  },
  {
    path: "noworrisearchresult/:phoneNumber",
    component: ResultPageComponent,
    //   children: [
    //     {path: 'disputepage', redirectTo: 'disputepage', pathMatch: 'full'},
    //       {
    //       path: 'disputepage',
    //       component: DisputPageComponent
    //     },
    // ]
  },
  {
    path: "disputepage/:business",
    component: DisputPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
