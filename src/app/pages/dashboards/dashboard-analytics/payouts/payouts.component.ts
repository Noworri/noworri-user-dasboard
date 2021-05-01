import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import icSearch from "@iconify/icons-ic/twotone-search";
import { MatTableDataSource } from "@angular/material/table";
import { BUSINESS_DATA_KEY, PAYOUT_TABLE_LABELS, SUMMARY_DATA_KEY, USER_SESSION_KEY } from "src/app/Models/constants";
import { BusinessAcount, UserSession, UserTransactionsSummary } from "src/app/Models/interfaces";
import { TransactionsService } from "src/app/services/transactions.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DashboardDialogComponent } from "../dashboard-dialog/dashboard-dialog.component";
export interface PeriodicElement {
  transactionId: number;
  channel: string;
  amount: number;
  status: string;
  payoutOn: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    transactionId: 123456443564,
    channel: "Bank account",
    amount: 1200,
    status: "sucess",
    payoutOn: "12/44/2022",
  },
];
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
    text: 'Bank Wiring',
    textClass: 'text-primary',
    cssClasses: ['text-primary','bg-primary-light'],
    bgClass: 'bg-primary-light',
    previewClass: 'bg-primary'
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private transactionsService: TransactionsService
  ) {
    const summary = localStorage.getItem(SUMMARY_DATA_KEY);
    this.summaryData = JSON.parse(summary);
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData = JSON.parse(businessData);
  }

  ngOnInit(): void {
    this.isWithdrawable = this.summaryData.totalPayouts > 1000 ? true : false;
    this.loadPayouts(this.userData.user_uid);
  }

  getStatusLabel(status: string) {
    return this.statusLabels.find((label) => label.text === status);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  false;
    dialogConfig.width = '400px',
    dialogConfig.data = {
      dialogHeader: 'PROCESS PAYOUT',
      dialogMessage: `You are about to withdraw ${this.userData.currency} ${this.summaryData.totalPayouts}`,
      buttonCancel: 'CANCEL',
      buttonConfirm: 'CONFRIM'
    }
    this.dialog.open(DashboardDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.actionResult = result;
      if(result === 'Yes') {
        console.log('confirmed');
        // this.withdraw();
      }
    });
  }

  withdraw() {
    const releaseData = {
    amount: this.summaryData.totalPayouts,
    recipient: this.businessAccountDetails.recipient_code,
    currency: this.userData.currency,
    user_id:  this.userData.user_uid
    }
    if(this.hasPayoutAccount) {
      this.transactionsService.initiateWithdrawal(releaseData).pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        return response;
      })
    } else {
      this.router.navigate(['dashboards/business-settings']);
    }
    return null;
  }

  get hasPendingPayout() {
    return this.summaryData.totalPayouts > 0;
  }

  getBusinessAccountDetails() {
    this.transactionsService
      .getAccountDetails(this.userData.user_uid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details: any) => {
        this.businessAccountDetails = details.data;
        this.hasPayoutAccount = details.data ? true: false;

        return details;
      });
  }

  
  loadPayouts(userId: string) {
    this.transactionsService
      .getBusinessUserPayouts(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.hasPayouts = transactions.length ? true : false;
          const updatedTransactions = transactions.map(transfer => {
            transfer.status = this.getStatusLabel(transfer.status);
            return transfer;
          })
          this.dataSource = new MatTableDataSource(updatedTransactions);
        },
        (error) => console.log(error.message)
      );
  }
}
