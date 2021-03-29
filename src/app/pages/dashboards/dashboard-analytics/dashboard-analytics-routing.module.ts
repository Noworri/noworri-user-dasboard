import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { AddBusinessComponent } from "./add-business/add-business.component";
import { BusinessActivationPendingComponent } from "./business-activation-pending/business-activation-pending.component";
import { BusinessSettingsComponent } from "./business-settings/business-settings.component";
import { DashboardAnalyticsComponent } from "./dashboard-analytics.component";
import { DevelopersComponent } from "./developers/developers.component";
import { PayoutsComponent } from "./payouts/payouts.component";
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";
import { TransactionTableComponent } from "./transaction-table/transaction-table.component";
import { UserProfilComponent } from "./user-profil/user-profil.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardAnalyticsComponent,
      },
      {
        path: "transactions",
        component: TransactionTableComponent,
      },
      {
        path: "payouts",
        component: PayoutsComponent,
      },
      {
        path: "transaction-details",
        component: TransactionDetailsComponent,
      },
      {
        path: "user-profil",
        component: UserProfilComponent,
      },
      {
        path: "add-business",
        component: AddBusinessComponent,
      },
      {
        path: "business-settings",
        component: BusinessSettingsComponent,
      },
      {
        path: "api",
        component: DevelopersComponent,
      },
      {
        path: "activation-pending",
        component: BusinessActivationPendingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class DashboardAnalyticsRoutingModule {}
