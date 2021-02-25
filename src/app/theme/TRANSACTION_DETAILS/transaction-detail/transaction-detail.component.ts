import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TransactionsService } from "src/app/Service/transactions.service";
import { SESSION_STORAGE_KEY } from "src/app/shared/constants";

@Component({
  selector: "app-transaction-detail",
  templateUrl: "./transaction-detail.component.html",
  styleUrls: ["./transaction-detail.component.scss"],
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  @Input()
  transactionKey: any;

  orderData: any;
  userSessionData: any;
  unsubscribe$ = new Subject();
  transactionType;
  userRole;
  amounts;
  items;
  descriptions;
  transactionId;
  totalAmount;
  noworriFee;
  hasDeliveryPhone;
  deliveryPhone;
  isUpdating = false;
  isUpdatingDelivery: boolean;
  prefixCountryCode: string;
  isValidating = false;
  isVendorTransaction: boolean;
  isFundsReleased: boolean;
  isCancelled: boolean;
  hasWithdrawn: boolean;
  transactionDetails: any;
  itemIds: string[];
  quantities: string[];
  dataLoaded = false;

  constructor(
    private transactionsService: TransactionsService,
    private route: ActivatedRoute
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userSessionData = sessionData;
  }

  ngOnInit() {
    this.loadUserTransaction();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNoworriFee(price) {
    return (price / 100) * 1.98;
  }

  getTotalAmount(price) {
    const amount = parseInt(price, 10) + this.getNoworriFee(price);
    return amount;
  }

  getAmount(prices) {
    const total = prices.reduce((acc, cur) => acc + Number(cur), 0).toFixed(2);
    const sum = Number(total) + this.getNoworriFee(total);
    this.totalAmount = Number(sum.toFixed(2));
    return this.totalAmount;
  }

  onUpdateDeliveryPhone() {
    this.isUpdatingDelivery = this.isUpdatingDelivery === true ? false : true;
  }

  updateDeliveryPhone(form: NgForm) {
    this.isUpdating = true;
    const newDeliveryNo = form.value["newDelivery"];
    const telInputPlaceholderInputValue = document
      .getElementsByTagName("input")[1]
      .getAttribute("placeholder");
    if (telInputPlaceholderInputValue === "023 123 4567") {
      this.prefixCountryCode = "+233";
    } else if (telInputPlaceholderInputValue === "0802 123 4567") {
      this.prefixCountryCode = "+234";
    } else if (telInputPlaceholderInputValue === "01 23 45 67") {
      this.prefixCountryCode = "+225";
    }
    const newDelivery = `${this.prefixCountryCode}${newDeliveryNo}`;
    this.transactionsService
      .updateDeliveryPhone(this.transactionId, newDelivery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          setTimeout(() => {
            this.isUpdating = false;
            this.loadUserTransaction();
          }, 5000);
          return response;
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
          this.loadUserTransaction();
        }
      );
  }

  loadUserTransaction() {
    this.transactionsService
      .getUserTransaction(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          transactions.forEach((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            this.userRole = "sell";
            const prices = details.price.split(",");
            this.amounts = prices.map((price) => {
              this.noworriFee = this.getNoworriFee(price).toFixed(2);
              this.totalAmount =
                parseInt(price, 10) - parseInt(this.noworriFee, 10);
              this.totalAmount = this.totalAmount.toFixed(2);
              return this.totalAmount;
            });
            this.items = details.name.split(",");
            this.descriptions = details.requirement.split(",");
            this.itemIds = details.item_id.split(",");
            this.quantities = details.item_qty.split(",");
            this.transactionId = details.id;
            this.deliveryPhone = details.delivery_phone
              ? details.delivery_phone
              : "N/A";
            if (details.etat === "3") {
              this.isFundsReleased = true;
            }
            if (details.etat === "0") {
              this.isCancelled = true;
            }
            if (details.etat === "5") {
              this.isFundsReleased = true;
              this.hasWithdrawn = true;
            }
            if (details.transaction_source === "vendor") {
              this.isVendorTransaction = true;
            } else {
              this.isVendorTransaction = false;
            }
            this.transactionDetails = details;
            this.orderData = this.getOrderData();
            this.dataLoaded = true;
          });
        },
        (error) => console.log(error.message)
      );
  }

  getOrderData() {
    const orderData = [];
    this.items.forEach((item, index) => {
      orderData.push({
        item: item,
        price: this.amounts[index],
        description: this.descriptions[index],
        qty: this.quantities[index],
        id: this.itemIds[index],
      });
    });
    this.getAmount(this.amounts);
    return orderData;
  }
}
