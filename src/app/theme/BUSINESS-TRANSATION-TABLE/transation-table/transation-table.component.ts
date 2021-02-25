import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { UserTransactionsSummary } from "src/app/Models/user-transactions-summary";
import { SESSION_STORAGE_KEY } from "src/app/shared/constants";

@Component({
  selector: "app-transation-table",
  templateUrl: "./transation-table.component.html",
  styleUrls: ["./transation-table.component.scss"],
})
export class TransationTableComponent implements OnInit, OnDestroy {
  summaryData: UserTransactionsSummary;
  isDateInput: Boolean;
  isFilterInput: boolean;
  filterKey: string;
  unsubscribe$ = new Subject();
  modalRef: BsModalRef;
  paymentData: any;
  userSessionData: any;
  addBankAccountConfig = {
    class: "AddBankaccountCss",
  };

  constructor(private modalService: BsModalService) {
    const sessionData = localStorage.getItem(SESSION_STORAGE_KEY);
    this.userSessionData = JSON.parse(sessionData);
    const summary = localStorage.getItem("summary_data");
    this.summaryData = JSON.parse(summary);
  }

  ngOnInit() {
    this.paymentData = {
      amount: this.summaryData.totalPayouts,
      currency: this.userSessionData.currency,
      transactionID: "",
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onWithdraw(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(template, this.addBankAccountConfig);
  }

  // doFilter(filterBy: string) {
  //   if (filterBy.length) {
  //     filterBy = filterBy.toLocaleLowerCase();
  //     this.tableData = this.tableData.filter(
  //       (row) => {
  //         const values = Object.values(row).map((value: string) => {
  //           return value ? value.toLocaleLowerCase() : value;
  //         });
  //         return values.includes(filterBy);
  //       }
  //       // col[this.filterKey].toLocaleLowerCase().includes(filterBy)
  //       // col[this.filterKey].toLocaleLowerCase().indexOf(filterBy) !== -1
  //     );
  //     if (!this.tableData.length) {
  //       this.noDataErrorMessage = "NO MATCH FOUND";
  //       this.hasNoTransactions = true;
  //       // setTimeout(() => {
  //       //   this.loadTransactions(this.userId);
  //       // }, 3000);
  //     }
  //     this.currentTransactionsCount = this.tableData.length;
  //   } else {
  //     this.loadTransactions(this.userId);
  //   }
  // }

  // resetFilter(searchForm: NgForm) {
  //   searchForm.reset();
  //   this.loadTransactions(this.userId);
  // }
}
