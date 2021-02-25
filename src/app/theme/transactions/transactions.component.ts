import { Component, OnInit, OnDestroy } from "@angular/core";
import { TransactionsService } from "src/app/Service/transactions.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TransactionsReference } from "src/app/Service/reference-data.interface";
import { PaymentService } from "src/app/Service/payment.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as moment from "moment";
import {
  SESSION_STORAGE_KEY,
  transactionSource,
} from "src/app/shared/constants";
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  isDateInput: Boolean;
  isFilterInput: boolean;
  filterKey: string;
  unsubscribe = new Subject();
  selectedAccountType: any;
  isBuyer: boolean;
  isBusinessSeller: boolean;
  tableData: any;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  transactionType: string;
  userId: string;
  userPhone: string;
  ownerPhone: string;
  ownerRole: string;
  hasNoTransactions: boolean;
  columns: any[];
  paymentResponse: any;
  allDateData: object;
  currentTransactionsCount = 0;
  currentRevenue = 0;
  noDataErrorMessage = "NO TRANSACTIONS CREATED YET";
  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.selectedAccountType = JSON.parse(
      localStorage.getItem("selected_account_type")
    );
    this.userId = sessionData.user_uid;
    this.userPhone = sessionData.mobile_phone;
  }

  ngOnInit() {
    this.loadTransactions(this.userId);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTransactions(userId: string, dateRangeData = null) {
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.transactionsService
      .getUserTransactions(userId, dateRangeData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (transactions) => {
          this.tableData = transactions.map((details) => {
            this.allDateData = details;
            this.transactionType = details.transaction_type.toLowerCase();
            if (details.price.includes(",")) {
              const prices = details.price.split(",");
              details.price = prices.reduce((a, b) => {
                return +a + +b;
              }, 0);
            }
            details.destinator_role =
              details.initiator_role === "buy" ? "sell" : "buy";
            if (
              details.initiator_role === "sell" &&
              this.userId === details.initiator_id
            ) {
              details["sellerPhone"] = details.initiator_phone;
              details["buyerPhone"] = details.destinator_phone;
            } else if (
              details.initiator_role === "buy" &&
              this.userId === details.initiator_id
            ) {
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            } else if (
              details.destinator_role === "buy" &&
              this.userId === details.destinator_id
            ) {
              details["sellerPhone"] = details.initiator_phone;
              details["buyerPhone"] = details.destinator_phone;
            } else if (
              details.destinator_role === "sell" &&
              this.userId === details.destinator_id
            ) {
              this.isBusinessSeller = true;
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            } else {
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            }
            this.amount = details.total_price;
            return details;
          });
          if (
            this.selectedAccountType &&
            this.selectedAccountType.isBusinessAccount &&
            this.isBusinessSeller
          ) {
            this.tableData = this.tableData.filter(
              (detail) => detail.transaction_source !== transactionSource.VENDOR
            );
          } else if (
            this.selectedAccountType &&
            !this.selectedAccountType.isBusinessAccount &&
            this.isBusinessSeller
          ) {
            this.tableData = this.tableData.filter(
              (detail) =>
                detail.transaction_source !== transactionSource.COMMERCE
            );
          }
          this.currentTransactionsCount = transactions.length;

          this.hasNoTransactions = !transactions.length ? true : false;
        },
        (error) => console.log(error.message)
      );
  }

  processDateData() {}

  onSearch(searchForm: NgForm) {
    const range = searchForm.value["dateRange"];
    const filterBy = searchForm.value["filterInput"];
    if (range) {
      let startDate = range[0];
      startDate = moment(startDate).format("YYYY-MM-DD");
      let endDate = range[1];
      endDate = moment(endDate).format("YYYY-MM-DD");
      const dateRangeData = {
        from: startDate,
        to: endDate,
      };
      this.loadTransactions(this.userId, dateRangeData);
    } else {
      this.doFilter(filterBy);
    }
  }

  doFilter(filterBy: string) {
    if (filterBy.length) {
      filterBy = filterBy.toLocaleLowerCase();
      this.tableData = this.tableData.filter(
        (row) => {
          const values = Object.values(row).map((value: string) => {
            return value ? value.toLocaleLowerCase() : value;
          });
          return values.includes(filterBy);
        }
        // col[this.filterKey].toLocaleLowerCase().includes(filterBy)
        // col[this.filterKey].toLocaleLowerCase().indexOf(filterBy) !== -1
      );
      if (!this.tableData.length) {
        this.noDataErrorMessage = "NO MATCH FOUND";
        this.hasNoTransactions = true;
        // setTimeout(() => {
        //   this.loadTransactions(this.userId);
        // }, 3000);
      }
      this.currentTransactionsCount = this.tableData.length;
    } else {
      this.loadTransactions(this.userId);
    }
  }

  resetFilter(searchForm: NgForm) {
    searchForm.reset();
    this.loadTransactions(this.userId);
  }

  onViewTransactionDetails(
    transactionKey,
    userRole,
    ownerRole,
    userPhone,
    ownerPhone,
    transactionType
  ) {
    transactionType = transactionType.toLowerCase();

    if (this.userPhone === userPhone) {
      this.userRole = userRole;
    } else if (this.userPhone === ownerPhone) {
      this.userRole = ownerRole;
    }

    if (this.userRole === "buy" && transactionType === "merchandise") {
      this.router.navigate([`buyermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === "sell" && transactionType === "merchandise") {
      this.router.navigate([`sellermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === "buy" && transactionType === "services") {
      this.router.navigate([`buyerservicescontrat/${transactionKey}`]);
    } else if (this.userRole === "sell" && transactionType === "services") {
      this.router.navigate([`sellerservicescontrat/${transactionKey}`]);
    }
  }
  showFilterInput(filter: string) {
    if (filter === "Date") {
      this.isDateInput = !this.isDateInput;
      this.isFilterInput = false;
    } else {
      this.filterKey = filter;
      this.isFilterInput = !this.isFilterInput;
      this.isDateInput = false;
    }
  }
}
