import {
  Component,
  ViewEncapsulation,
  OnInit,
  TemplateRef,
  Input,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { SimpleChanges, OnChanges, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/Service/transactions.service";
import { takeUntil } from "rxjs/operators";
import { isEmpty } from "lodash";
import { Subject, from } from "rxjs";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";

const SESSION_STORAGE_KEY = "noworri-user-session";

@Component({
  selector: "app-payements",
  templateUrl: "./payements.component.html",
  styleUrls: ["./payements.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PayementsComponent implements OnInit, OnDestroy {
  @Input()
  paymentData;

  @Input()
  modal: BsModalRef;

  email: string;
  name: string;
  mobile_phone: string;
  userId: string;
  unsubscribe = new Subject();
  accountDetails: object;
  form: FormGroup;
  isAdding = false;
  hasMaxAccounts: boolean;
  hasMaxWallets: boolean;
  hasAccount: boolean;
  detailsAccount: any;
  detailsWallet: any;
  recipientDetails: object;
  currency: string;
  bankList: any;
  country: string;
  modalRef: BsModalRef;
  unsubscribe$ = new Subject();
  hasWithdrawn = false;
  hasPaymentData: boolean;

  addBankAccountconfig = {
    class: "AddBankaccountCss",
  };
  networkList: any;
  errorMessage: any;
  banks: any;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private transactionService: TransactionsService,
    private fb: FormBuilder
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.userId = sessionData.user_uid;
    if (this.mobile_phone.startsWith("+233")) {
      this.currency = "GHS";
      this.country = "Ghana";
    } else {
      this.currency = "NGN";
      this.country = "Nigeria";
    }
  }

  ngOnInit() {
    this.getAccountDetails();
    this.getBankList(this.country);
    this.hasPaymentData = this.paymentData ? true : false;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // ----------- create Bank account modale---------------------------//
  openAddBankAccountModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.addBankAccountconfig);
  }

  getBankList(country) {
    this.transactionService
      .getBanks(country)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((banks) => {
        this.bankList = banks.filter(
          (bank) => bank.type === "ghipss" || bank.type === "nuban"
        );
        this.networkList = banks.filter((bank) => bank.type === "mobile_money");
        this.banks = banks;
      });
  }

  onWithDraw(recipientCode) {
    const releaseData = {
      source: "balance",
      amount: Math.round(this.paymentData.amount),
      recipient: recipientCode,
      currency: this.paymentData.currency,
      transactionID: this.paymentData.transactionID,
    };
    this.initiateRelease(releaseData);
    this.modal.hide();
  }

  initiateRelease(releaseData) {
    this.transactionService
      .initiateReleasePaystack(releaseData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response && response["status"] === "success") {
          this.hasWithdrawn = true;
          location.replace(`${location}`);
        }

        return response;
      });
  }

  setupForm(form: NgForm) {
    if (form) {
      this.banks
        .filter((bank) => bank.name === form.value["bankName"])
        .forEach((value) => {
          this.accountDetails = {
            bankName: form.value["bankName"],
            bankCode: value.code,
            holderName: form.value["holderName"],
            accountNo: form.value["accountNo"],
            userId: this.userId,
            type: value.type,
            recipient_code: "",
          };
        });
      this.createRecipient(this.accountDetails);
    }
  }

  createRecipient(accountDetails) {
    this.isAdding = true;
    this.recipientDetails = {
      type: accountDetails.type,
      name: accountDetails.holderName,
      description: "Noworri Transaction",
      account_number: accountDetails.accountNo,
      bank_code: accountDetails.bankCode,
      currency: this.currency,
    };
    this.transactionService
      .createRecipient(this.recipientDetails, this.accountDetails["userId"])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        if (response.data && response.data.recipient_code) {
          this.isAdding = false;
        }
        if (response.status === false) {
          this.errorMessage = response.message;
          this.isAdding = false;
        }
        return response;
      });
  }

  addAccountDetails(accountDetails) {
    this.transactionService
      .addNewAccount(accountDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.isAdding = false;
        this.modalRef.hide();
        this.getAccountDetails();
        return response;
      });
  }

  deletedAccount(recipient: string) {
    const accountData = {
      recipient_code: recipient,
      currency: this.currency,
    };
    this.transactionService
      .deleteUserAccount(accountData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.getAccountDetails();
        }
        return response;
      });
  }

  getAccountDetails() {
    this.transactionService
      .getAccountDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((details: any) => {
        if (isEmpty(details)) {
          this.hasAccount = false;
        } else {
          this.detailsAccount = details.filter(
            (detail) =>
              !detail.bank_name.includes("AirtelTigo") &&
              !detail.bank_name.includes("Vodafone") &&
              !detail.bank_name.includes("MTN")
          );
          this.detailsWallet = details.filter(
            (detail) =>
              detail.bank_name.includes("AirtelTigo") ||
              detail.bank_name.includes("Vodafone") ||
              detail.bank_name.includes("MTN")
          );
          this.hasAccount = true;
          if (this.detailsAccount && this.detailsAccount.length > 4) {
            this.hasMaxAccounts = true;
          } else {
            this.hasMaxAccounts = false;
          }
          if (this.detailsWallet && this.detailsWallet.length > 4) {
            this.hasMaxWallets = true;
          } else {
            this.hasMaxWallets = false;
          }
          return details;
        }
      });
  }
}
