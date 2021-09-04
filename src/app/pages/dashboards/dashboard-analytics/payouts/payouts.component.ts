import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import icSearch from "@iconify/icons-ic/twotone-search";
import { MatTableDataSource } from "@angular/material/table";
import {
  BUSINESS_ACCOUNT_DATA_KEY,
  BUSINESS_DATA_KEY,
  PAYOUT_TABLE_LABELS,
  SUMMARY_DATA_KEY,
  USER_SESSION_KEY,
} from "src/app/Models/constants";
import {
  BusinessAcount,
  UserSession,
  UserTransactionsSummary,
} from "src/app/Models/interfaces";
import { TransactionsService } from "src/app/services/transactions.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DashboardDialogComponent } from "../dashboard-dialog/dashboard-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoadingBarService } from "@ngx-loading-bar/core";
export interface PeriodicElement {
  transactionId: number;
  channel: string;
  amount: number;
  status: string;
  payoutOn: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: "vex-payouts",
  templateUrl: "./payouts.component.html",
  styleUrls: ["./payouts.component.scss"],
})
export class PayoutsComponent implements OnInit {
  displayedColumns: string[] = [
    "transactionId",
    "channel",
    "amount",
    "status",
    "payoutOn",
  ];
  statusLabels = PAYOUT_TABLE_LABELS;
  TRANSFER_MODE = {
    text: "Bank Wiring",
    textClass: "text-primary",
    cssClasses: ["text-primary", "bg-primary-light"],
    bgClass: "bg-primary-light",
    previewClass: "bg-primary",
  };

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  layoutCtrl = new FormControl("boxed");
  searchCtrl = new FormControl();
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  summaryData: UserTransactionsSummary;
  userData: UserSession;
  hasPayouts: boolean;
  businessData: BusinessAcount;
  businessAccountDetails: any;
  hasPayoutAccount: boolean;
  isWithdrawable: boolean;
  actionResult: any;

  unsubscribe$ = new Subject();

  icSearch = icSearch;
  hasMomoAccount: boolean;
  pendingPayoutTransactions: any;
  isLoading: boolean;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private transactionService: TransactionsService,
    private loadingBar: LoadingBarService,
  ) {
    const summary = localStorage.getItem(SUMMARY_DATA_KEY);
    this.summaryData = JSON.parse(summary);
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData = JSON.parse(businessData);
  }

  ngOnInit(): void {
    this.loadPayouts(this.userData.user_uid);
    this.getBusinessAccountDetails();
  }

  getStatusLabel(status: string) {
    return this.statusLabels.find((label) => label.text === status);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    (dialogConfig.width = "400px"),
      (dialogConfig.data = {
        dialogHeader: "PROCESS PAYOUT",
        dialogMessage: `You are about to withdraw ${this.userData.currency} ${this.summaryData.totalPayouts}`,
        buttonCancel: "CANCEL",
        buttonConfirm: "CONFRIM",
      });
    this.dialog
      .open(DashboardDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        this.actionResult = result;
        if (result === "Yes") {
          this.withdraw();
        }
      });
  }

  withdraw() {
    this.loadingBar.useRef('loading').start(0);
    const withdrawalData = {
      source: 'balance',
      reason: 'Noworri Payment Release',
      amount: this.summaryData.totalPayouts,
      recipient: this.businessAccountDetails.recipient_code,
      currency: this.userData.currency,
      user_id: this.userData.user_uid,
      pendingPayouts: this.summaryData.pendingPayouts
    };
    if (this.hasPayoutAccount) {
      this.transactionsService
        .processBusinessPayout(withdrawalData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response) => {
          this.loadingBar.useRef('loading').complete();
          if(response && response.status === true){
            this.openSnackbar(response['message']);
            this.getTransactionsSummaryData(this.userData.user_uid);
            this.loadPayouts(this.userData.user_uid);
            this.router.navigate([" "]);
          } else {
            this.openSnackbar(response['message']);
          }
        });
    } else {
      this.router.navigate(["/dashboards/business-settings"]);
    }
    return null;
  }

  get hasPendingPayout() {
    return this.summaryData.totalPayouts > 0;
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }

  getBusinessAccountDetails() {
    this.transactionsService
      .getAccountDetails(this.userData.user_uid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details: any) => {
        this.businessAccountDetails = details.data;
        this.hasPayoutAccount = !!details.data ? true : false;
        this.hasMomoAccount = details.data?.type === "mobile_money";
        this.isWithdrawable = (this.summaryData.totalPayouts > 1000 || this.hasMomoAccount) ? true : false;
        return details;
      });
  }

  getTransactionsSummaryData(userId: string) {
    this.transactionService
      .getUserTransactionSummary(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((summaryData: UserTransactionsSummary) => {
        if(summaryData) {
          this.summaryData = summaryData;
          localStorage.setItem("summary_data", JSON.stringify(this.summaryData));  
        }
        return summaryData;
      });
  }
  loadPayouts(userId: string) {
    this.isLoading = true;
    this.transactionsService
      .getBusinessUserPayouts(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.isLoading = false;
          this.hasPayouts = transactions.processedPayouts.length ? true : false;
          const updatedTransactions = transactions.processedPayouts.map((transfer) => {
            transfer.status = this.getStatusLabel(transfer.status);
            return transfer;
          });
          this.pendingPayoutTransactions = transactions.pendingPayouts;
          this.dataSource = new MatTableDataSource(updatedTransactions);
        },
        (error) => {
          this.isLoading = false;
          console.log(error.message)}
      );
  }
}
