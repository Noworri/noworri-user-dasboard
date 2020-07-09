import { TermConditionsComponent } from './theme/privacy/term-conditions/term-conditions.component';
import { PolicyComponent } from './theme/privacy/policy/policy.component';
import { PrivacyComponent } from './theme/privacy/privacy.component';
import { LandingPageComponent } from './theme/landing-page/landing-page.component'
import { SearchPageComponent } from './theme/search-page/search-page.component'
import { ResultPageComponent } from './theme/result-page/result-page.component'

import { Router, Routes, RouterModule } from '@angular/router'

import { RegisterService } from './theme/auth/register/register.service'
import { environment } from './../environments/environment.prod'
import { HomeInputService } from './Service/home-input.service'
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AdminComponent } from './layout/admin/admin.component'
import { AuthComponent } from './layout/auth/auth.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './shared/shared.module'
import { MenuItems } from './shared/menu-items/menu-items'
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component'
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { HttpClientModule } from '@angular/common/http'
import { CoolComponent } from './view/cool/cool.component'
import { DisputPageComponent } from './theme/disput-page/disput-page.component'
import { DisputesComponent } from './theme/disputes/disputes.component';
import { PaymentComponent } from './theme/payment/payment.component';
import { HomeComponent } from './theme/home/home.component';
import { TransactionsComponent } from './theme/transactions/transactions.component';
import { EscrowStep1Component } from './theme/escrow-step1/escrow-step1.component';
import { EscrowStep2Component } from './theme/escrow-step2/escrow-step2.component';
import { ContratAcheteurComponent } from './theme/contrat-acheteur/contrat-acheteur.component';
import { ContratVendeurComponent } from './theme/contrat-vendeur/contrat-vendeur.component';
import { SettingsComponent } from './theme/settings/settings.component';
import { ApiIntegrationComponent } from './theme/api-integration/api-integration.component';
import {IntlTelInputNgModule} from 'intl-tel-input-ng'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    CoolComponent,
    SearchPageComponent,
    LandingPageComponent,
    ResultPageComponent,
    DisputPageComponent,
    DisputesComponent,
    PrivacyComponent,
    PolicyComponent,
    PaymentComponent,
    TermConditionsComponent,
      HomeComponent,
   TransactionsComponent,
    EscrowStep1Component,
    EscrowStep2Component,
   ContratAcheteurComponent,
   ContratVendeurComponent,
   SettingsComponent,
   ApiIntegrationComponent
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    MatButtonModule,
    ModalModule.forRoot(),
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    IntlTelInputNgModule.forRoot()
  ],
  schemas: [],
  providers: [MenuItems, HomeInputService, RegisterService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule {}
