import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { DashboardAnalyticsComponent } from "./dashboard-analytics.component";
import { PayoutsComponent } from "./payouts/payouts.component";
import { TransactionTableComponent } from "./transaction-table/transaction-table.component";

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class DashboardAnalyticsRoutingModule {}
