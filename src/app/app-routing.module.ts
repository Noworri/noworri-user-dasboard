import { ResultPageComponent } from './theme/result-page/result-page.component';

import { PrivacyComponent } from './theme/privacy/privacy.component';
import { LandingPageComponent } from './theme/landing-page/landing-page.component';
import { SearchPageComponent } from './theme/search-page/search-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

import { DisputPageComponent } from './theme/disput-page/disput-page.component';
import { HomeComponent } from './theme/home/home.component';
import { TransactionsComponent } from './theme/transactions/transactions.component';
import { DisputesComponent } from './theme/disputes/disputes.component';
import { PaymentComponent } from './theme/payment/payment.component';
import { ApiIntegrationComponent } from './theme/api-integration/api-integration.component';
import { SettingsComponent } from './theme/settings/settings.component';
import { MerchandiseEscrowStep1Component } from './theme/merchandise-escrow-step1/merchandise-escrow-step1.component';
import { MerchandiseEscrowStep2Component } from './theme/merchandise-escrow-step2/merchandise-escrow-step2.component';
import { LoginComponent } from './theme/auth/login/login.component';
import { RegisterComponent } from './theme/auth/register/register.component';
import { BuyerServicesContratComponent } from './theme/buyer-services-contrat/buyer-services-contrat.component';
import { SellerServicesContratComponent } from './theme/seller-services-contrat/seller-services-contrat.component';
import { SellerMerchandiseContratComponent } from './theme/seller-merchandise-contrat/seller-merchandise-contrat.component';
import { BuyerMerchandiseContratComponent } from './theme/buyer-merchandise-contrat/buyer-merchandise-contrat.component';
import { SellerEscrowMerchandiseStep1Component } from './theme/seller-escrow-merchandise-step1/seller-escrow-merchandise-step1.component';
import { EscrowServicesBuyerStep2Component } from './theme/escrow-services-buyer-step2/escrow-services-buyer-step2.component';
import { EscrowServicesBuyersStep1Component } from './theme/escrow-services-buyers-step1/escrow-services-buyers-step1.component';
import { HomegetstrustedComponent } from './theme/homegetstrusted/homegetstrusted.component';
import { FormgetstrustedComponent } from './theme/formgetstrusted/formgetstrusted.component';
import { IdentityVerificationComponent } from './theme/identity-verification/identity-verification.component';
import { SelfiVericationComponent } from './theme/selfi-verication/selfi-verication.component';
import { GetstrutedRecapComponent } from './theme/getstruted-recap/getstruted-recap.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'disputes',
        component: DisputesComponent,
      },
      {
        path: 'payments',
        component: PaymentComponent,
      },
      {
        path: 'escrowservicesbuyersstep1',
        component: EscrowServicesBuyersStep1Component,
      },
      {
        path: 'escrowservicesbuyersstep2',
        component: EscrowServicesBuyerStep2Component,
      },
      {
        path: 'buyerservicescontrat/:transactionKey',
        component: BuyerServicesContratComponent,
      },
      {
        path: 'sellerservicescontrat/:transactionKey',
        component: SellerServicesContratComponent,
      },
      {
        path: 'sellermerchandisecontrat/:transactionKey',
        component: SellerMerchandiseContratComponent,
      },
      {
        path: 'buyermerchandisecontrat/:transactionKey',
        component: BuyerMerchandiseContratComponent,
      },
      {
        path: 'sellerescrowmerchandisestep1',
        component: SellerEscrowMerchandiseStep1Component
      },
      {
        path: 'homegetstrusted',
        component: HomegetstrustedComponent
      },
      {
        path:'formgetstruted',
        component:FormgetstrustedComponent
      },
      {
        path:'identityverification',
        component:IdentityVerificationComponent
      },
      {
        path:'selfiverification',
        component:SelfiVericationComponent
      },
      {
        path:'getstustedrecap',
        component:GetstrutedRecapComponent
      },
      {
        path:'git',
        component:GetstrutedRecapComponent
      },
      {
        path: 'api',
        component: ApiIntegrationComponent
      },
      {
        path: 'Settings',
        component: SettingsComponent
      },
      {
        path: 'escrowmerchandisestep1',
        component: MerchandiseEscrowStep1Component
      },
      {
        path: 'escrowmerchandisestep2',
        component: MerchandiseEscrowStep2Component
      }
    ],
  },
  {
    path: 'whatnoworri',
    component: LandingPageComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'noworrisearchresult/:phoneNumber',
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
    path: 'disputepage/:business',
    component: DisputPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
