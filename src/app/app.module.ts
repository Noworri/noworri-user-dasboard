

import { TermConditionsComponent } from "./theme/privacy/term-conditions/term-conditions.component";
import { PolicyComponent } from "./theme/privacy/policy/policy.component";
import { PrivacyComponent } from "./theme/privacy/privacy.component";
import { LandingPageComponent } from "./theme/landing-page/landing-page.component";
import { SearchPageComponent } from "./theme/search-page/search-page.component";
import { ResultPageComponent } from "./theme/result-page/result-page.component";
import { Router, Routes, RouterModule } from "@angular/router";
import { RegisterService } from "./theme/auth/register/register.service";
import { environment } from "./../environments/environment.prod";
import { HomeInputService } from "./Service/home-input.service";
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./layout/admin/admin.component";
import { AuthComponent } from "./layout/auth/auth.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { MenuItems } from "./shared/menu-items/menu-items";
import { BreadcrumbsComponent } from "./layout/admin/breadcrumbs/breadcrumbs.component";
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";
import { MatCheckboxModule } from "@angular/material/checkbox";


import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { HttpClientModule } from "@angular/common/http";
import { CoolComponent } from "./view/cool/cool.component";
import { DisputPageComponent } from "./theme/disput-page/disput-page.component";
import { PaymentComponent } from "./theme/payment/payment.component";
import { HomeComponent } from "./theme/home/home.component";
import { TransactionsComponent } from "./theme/transactions/transactions.component";
import { SettingsComponent } from "./theme/settings/settings.component"
import { ApiIntegrationComponent } from "./theme/api-integration/api-integration.component";
import { IntlTelInputNgModule } from "intl-tel-input-ng";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { EditorModule } from "@tinymce/tinymce-angular";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { NgPaymentCardModule } from "ng-payment-card";
import { RegisterComponent } from "./theme/auth/register/register.component";
import { LoginComponent } from './theme/auth/login/login.component';
import { BuyerServicesContratComponent } from './theme/buyer-services-contrat/buyer-services-contrat.component';
import { SellerServicesContratComponent } from './theme/seller-services-contrat/seller-services-contrat.component';
import { SellerMerchandiseContratComponent } from './theme/seller-merchandise-contrat/seller-merchandise-contrat.component';
import { BuyerServicesContratModule } from './theme/buyer-services-contrat/buyer-services-contrat.module';
import { BuyerMerchandiseContratComponent } from './theme/buyer-merchandise-contrat/buyer-merchandise-contrat.component';
import { HomegetstrustedComponent } from './theme/homegetstrusted/homegetstrusted.component';
import { FormgetstrustedComponent } from './theme/formgetstrusted/formgetstrusted.component';
import { IdentityVerificationComponent } from './theme/identity-verification/identity-verification.component';
import { GetstrutedRecapComponent } from './theme/getstruted-recap/getstruted-recap.component';
import { SelfiVericationComponent } from './theme/selfi-verication/selfi-verication.component';
import { MatMenuModule } from '@angular/material/menu';
import { GeoLocationService } from './Service/geo-location.service';
import { EscrowServiceBuyerstep1Component } from './theme/ESCROWPART/escrow-service-buyerstep1/escrow-service-buyerstep1.component';
import { EscrowServiceSellerstep1Component } from './theme/ESCROWPART/escrow-service-sellerstep1/escrow-service-sellerstep1.component';
import { EscrowServiceSellerstep2Component } from './theme/ESCROWPART/escrow-service-sellerstep2/escrow-service-sellerstep2.component';
import { EscrowServiceBuyerstep2Component } from './theme/ESCROWPART/escrow-service-buyerstep2/escrow-service-buyerstep2.component';
import { EscrowMerchandiseBuyerstep1Component } from './theme/ESCROWPART/escrow-merchandise-buyerstep1/escrow-merchandise-buyerstep1.component';
import { EscrowMerchandiseSellerstep1Component } from './theme/ESCROWPART/escrow-merchandise-sellerstep1/escrow-merchandise-sellerstep1.component';
import { EscrowMerchandiseSellerstep2Component } from './theme/ESCROWPART/escrow-merchandise-sellerstep2/escrow-merchandise-sellerstep2.component';
import { EscrowMerchandiseBuyerstep2Component } from './theme/ESCROWPART/escrow-merchandise-buyerstep2/escrow-merchandise-buyerstep2.component';


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
    PrivacyComponent,
    PolicyComponent,
    PaymentComponent,
    TermConditionsComponent,
    HomeComponent,
    TransactionsComponent,
    SettingsComponent,
    ApiIntegrationComponent,
    RegisterComponent,
    LoginComponent,
    BuyerServicesContratComponent,
    SellerServicesContratComponent,
    SellerMerchandiseContratComponent,
    BuyerMerchandiseContratComponent,
    HomegetstrustedComponent,
    FormgetstrustedComponent,
    IdentityVerificationComponent,
    SelfiVericationComponent,
    GetstrutedRecapComponent,
    EscrowServiceBuyerstep1Component,
    EscrowServiceSellerstep1Component,
    EscrowServiceSellerstep2Component,
    EscrowServiceBuyerstep2Component,
    EscrowMerchandiseBuyerstep1Component,
    EscrowMerchandiseSellerstep1Component,
    EscrowMerchandiseSellerstep2Component,
    EscrowMerchandiseBuyerstep2Component,
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
    IntlTelInputNgModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaterialTimepickerModule,
    AmazingTimePickerModule,
    EditorModule,
    NgPaymentCardModule,
    MatMenuModule
  ],
  schemas: [],
  providers: [MenuItems, HomeInputService, RegisterService, BsModalRef, GeoLocationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
