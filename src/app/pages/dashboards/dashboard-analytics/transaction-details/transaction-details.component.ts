import { Component, OnDestroy, OnInit } from "@angular/core";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMap from "@iconify/icons-ic/twotone-maps-home-work";
import { IconModule } from "@visurel/iconify-angular";
import { take, takeUntil } from "rxjs/operators";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { ActivatedRoute } from "@angular/router";
import { TransactionsService } from "src/app/services/transactions.service";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import icPerson from "@iconify/icons-ic/twotone-person";
import icEmail from "@iconify/icons-ic/twotone-email";
import icLock from "@iconify/icons-ic/twotone-lock";
import icCancel from "@iconify/icons-ic/twotone-cancel";
import icInfo from "@iconify/icons-ic/twotone-info";
import icEdit from "@iconify/icons-ic/twotone-edit";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "vex-transaction-details",
  templateUrl: "./transaction-details.component.html",
  styleUrls: ["./transaction-details.component.scss"],
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
  icPhone = icPhone;
  icMap = icMap;
  icPerson = icPerson;
  icEmail = icEmail;
  icLock = icLock;
  icCancel = icCancel;
  icInfo = icInfo;
  icEdit = icEdit;

  displayPhoneNumber: boolean;
  displayPhoneInput: boolean;

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
  transactionKey: string;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["id", "name", "description", "qty", "unity price","total"];

  constructor(
    private transactionsService: TransactionsService,
    private route: ActivatedRoute
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userSessionData = sessionData;
    route.params.pipe(take(1)).subscribe((param) => {
      this.transactionKey = param.transactionKey;
    });
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
            const items: any[] = JSON.parse(details.items);
            this.dataSource = new MatTableDataSource(items);
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

  cancelTransaction() {
    const data = {
      id: this.transactionDetails.id,
      canceled_by: this.userSessionData.user_uid,
    };
    this.transactionsService
      .cancelOrder(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.success && response.success === true) {
          this.loadUserTransaction();
        }
      });
  }
  onDisplayInput() {
    this.displayPhoneInput = !this.displayPhoneInput;
    this.displayPhoneNumber = !this.displayPhoneNumber;
  }
}
