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
import { DisputesComponent } from "./theme/disputes/disputes.component";
import { PaymentComponent } from "./theme/payment/payment.component";
import { EscrowStep1Component } from "./theme/escrow-step1/escrow-step1.component";
import { EscrowStep2Component } from "./theme/escrow-step2/escrow-step2.component";
import { ContratAcheteurComponent } from "./theme/contrat-acheteur/contrat-acheteur.component";
import { ContratVendeurComponent } from "./theme/contrat-vendeur/contrat-vendeur.component";
import { ApiIntegrationComponent } from './theme/api-integration/api-integration.component';
import { SettingsComponent } from './theme/settings/settings.component';
import { MerchandiseEscrowStep1Component } from './theme/merchandise-escrow-step1/merchandise-escrow-step1.component';
import { MerchandiseEscrowStep2Component } from './theme/merchandise-escrow-step2/merchandise-escrow-step2.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full",
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
        path: "disputes",
        component: DisputesComponent,
      },
      {
        path: "payments",
        component: PaymentComponent,
      },
      {
        path: "escrowstep1",
        component: EscrowStep1Component,
      },
      {
        path: "escrowstep2",
        component: EscrowStep2Component,
      },
      {
        path: "contratacheteur",
        component: ContratAcheteurComponent,
      },
      {
        path: "contratvendeur",
        component: ContratVendeurComponent,
      },
      {
        path:'api',
        component:ApiIntegrationComponent
      },
      {
        path:'Settings',
        component:SettingsComponent
      },
      {
        path:'escrowmerchandisestep1',
        component:MerchandiseEscrowStep1Component
      },
      {
        path:'escrowmerchandisestep2',
        component:MerchandiseEscrowStep2Component
      }
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
    //       path: "disputepage",
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
export class AppRoutingModule {}
