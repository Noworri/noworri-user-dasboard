import { Component, OnDestroy, OnInit } from "@angular/core";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMap from "@iconify/icons-ic/twotone-maps-home-work";
import { IconModule } from "@visurel/iconify-angular";
import { take, takeUntil } from "rxjs/operators";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { ActivatedRoute, Router } from "@angular/router";
import { TransactionsService } from "src/app/services/transactions.service";
import { Subject } from "rxjs";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import icPerson from "@iconify/icons-ic/twotone-person";
import icEmail from "@iconify/icons-ic/twotone-email";
import icLock from "@iconify/icons-ic/twotone-lock";
import icCancel from "@iconify/icons-ic/twotone-cancel";
import icInfo from "@iconify/icons-ic/twotone-info";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icSend from "@iconify/icons-ic/twotone-send";
import { MatTableModule } from "@angular/material/table";
import { GeoLocationService } from "src/app/services/geo-location.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DashboardDialogComponent } from "../dashboard-dialog/dashboard-dialog.component";
import { LoadingBarService } from "@ngx-loading-bar/core";

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
  icSend = icSend

  displayPhoneNumber: boolean;
  displayPhoneInput: boolean;

  orderData = [];
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
  newDeliveryNo: string;
  buyerPhototURL: string;
  isUpdating = false;
  isUpdatingDelivery: boolean = false;
  prefixCountryCode: string;
  isValidating = false;
  isVendorTransaction: boolean;
  isFundsReleased: boolean;
  isCancelled = false;
  hasWithdrawn = false;
  transactionDetails: any;
  itemIds: string[];
  quantities: string[];
  dataLoaded = false;
  transactionKey: string;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["id", "name", "description", "qty", "total"];
  locationData: any;
  countryData: any;
  waitingDisplayInput: boolean;
  form: FormGroup;
  actionResult: any;
  canCancel: boolean;
  subTotal: any;

  constructor(
    private transactionsService: TransactionsService,
    private route: ActivatedRoute,
    private geoLocationService: GeoLocationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private loadingBar: LoadingBarService,
    public router: Router
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userSessionData = sessionData;
    route.params.pipe(take(1)).subscribe((param) => {
      this.transactionKey = param.transactionKey;
    });
  }

  ngOnInit() {
    this.getLocationData();
    this.loadUserTransaction();
    this.setUpdateDeliveryForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNoworriFee(price) {
    return (price / 100) * 2.5;
  }

  getTotalAmount(price) {
    const amount = parseInt(price, 10) + this.getNoworriFee(price);
    return amount;
  }

  getAmount(prices) {
    const total = prices?.reduce((acc, cur) => acc + Number(cur), 0).toFixed(2);
    this.subTotal = total;
    const sum = Number(total) - this.getNoworriFee(total);
    this.totalAmount = Number(sum.toFixed(2));
    return this.totalAmount;
  }

  onUpdateDeliveryPhone() {
    this.isUpdatingDelivery = this.isUpdatingDelivery === true ? false : true;
  }

  setUpdateDeliveryForm() {
    this.form = this.fb.group({
      newDeliveryNo: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }

  updateDeliveryPhone() {
    this.loadingBar.useRef('loading').start(0);
    const newDeliveryNo = this.form.value['newDeliveryNo'];
    this.isUpdating = true;
    this.isUpdatingDelivery =  true;
    const newDelivery = `${this.prefixCountryCode}${newDeliveryNo}`;
    this.transactionsService
      .updateDeliveryPhone(this.transactionId, newDelivery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.loadingBar.useRef('loading').complete();
          setTimeout(() => {
            this.isUpdating = false;
            this.onDisplayInput();
            this.loadUserTransaction();
          }, 5000);
          return response;
        },
        (error) => {
          this.loadingBar.useRef('loading').complete();
          this.isValidating = false;
          console.error(error);
          this.loadUserTransaction();
        }
      );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      dialogHeader: 'CANCEL ORDER',
      buttonCancel: 'CANCEL',
      buttonConfirm: 'CONFRIM',
      dialogMessage: 'Are you sure you want to cancel this order?'
    }
    this.dialog.open(DashboardDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.actionResult = result;
      if (result === 'Yes') {
        this.cancelTransaction();
        // this.withdraw();
      }
    });
  }

  getLocationData() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    })
      .then(() => {
        if (!this.locationData) {
        } else {
          this.countryData = {
            preferredCountries: [`${this.locationData}`],
            localizedCountries: { ng: "Nigeria", gh: "Ghana" },
            onlyCountries: ["GH", "NG"],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === "GH" ||
          this.locationData.country_code === "NG"
        ) {
          this.prefixCountryCode = this.locationData.country_calling_code;
        } else {
          this.prefixCountryCode = "+233";
        }
      });
  }

  loadUserTransaction() {
    this.loadingBar.useRef('loading').start(0);
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
            this.buyerPhototURL = details.initiator_photo
              ? `https://noworri.com/api/public/uploads/images/pp/${details.initiator_photo}`
              : ``;

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
            this.loadingBar.useRef('loading').complete();
            this.canCancel = !this.isFundsReleased && !this.isCancelled && !this.hasWithdrawn;

            this.transactionDetails = details;
            const items: any[] = JSON.parse(details.items);
            if(!this.orderData.length) {
              this.getOrderData(items);              
            }
            this.dataSource = new MatTableDataSource(items);
            this.dataLoaded = true;
          });
        },
        (error) => console.error(error.message)
      );
  }

  getOrderData(items) {
    let itemsData = items;

    if (typeof itemsData === 'string') {
      itemsData = JSON.parse(items);
    }
    if (!!itemsData.name) {
      const data =
      {
        name: itemsData.name,
        price: itemsData.price,
        description: itemsData.description,
        items_qty: itemsData.items_qty,
        item_id: itemsData.item_id,
      };
      this.orderData?.push(data);
    } else {
      itemsData.forEach((item: any) => {
        this.orderData?.push({
          name: item.name,
          price: item.price,
          description: item.description,
          items_qty: item.items_qty,
          item_id: item.item_id,
          });
      });
    }
    const priceList = this.orderData?.map((data: any) => data.price);
    this.getAmount(priceList);
  }

  cancelTransaction() {
    this.loadingBar.useRef('loading').start(0);
    const data = {
      id: this.transactionDetails.id,
      canceled_by: this.userSessionData.user_uid,
    };
    this.transactionsService
      .cancelOrder(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        this.loadingBar.useRef('loading').complete();
        if (response.success && response.success === true) {
          this.router.navigate([`dashboards/transactions`]);
        }
      });
  }
  onDisplayInput() {
    this.displayPhoneInput = !this.displayPhoneInput;
    this.displayPhoneNumber = !this.displayPhoneNumber;
  }
}
