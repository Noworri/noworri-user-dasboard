import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BUSINESS_DATA_KEY, USER_SESSION_KEY } from "src/app/Models/constants";
import { BusinessAcount, UserSession } from "src/app/Models/interfaces";
import { TransactionsService } from "src/app/services/transactions.service";

@Component({
  selector: "vex-business-settings",
  templateUrl: "./business-settings.component.html",
  styleUrls: ["./business-settings.component.scss"],
})
export class BusinessSettingsComponent implements OnInit {
  showModal = false;
  showUpdateModal = false;
  userBusinessData: BusinessAcount;
  userData: UserSession;
  userId: string;
  businessAccountDetails: any;
  isAdding = false;
  recipientDetails: any;
  errorMessage: string;
  accountDetails: FormGroup;
  bsuinessWalletDetails: any;
  hasMaxAccounts: boolean;
  hasMaxWallets: boolean;
  banksData = [];
  networkList = [];
  banksList = [];
  bankNames = [];
  country: string;
  hasPayoutAccount = false;

  unsubscribe$ = new Subject();
  constructor(
    private transactionService: TransactionsService,
    private formBuilder: FormBuilder
  ) {
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    this.userId = sessionData.user_uid;
    if (sessionData.currency === "GHS") {
      this.country = "Ghana";
    } else {
      this.country = "Nigeria";
    }
  }

  ngOnInit(): void {
    this.getBankList(this.country);
    this.getBusinessAccountDetails();
    this.accountDetails = this.formBuilder.group({
      bankName: ["", Validators.required],
      bankCode: ["", Validators.required],
      holderName: ["", Validators.required],
      accountNo: ["", Validators.required],
      type: ["", Validators.required],
    });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleUpdateAccountModal() {
    this.showUpdateModal = !this.showUpdateModal
  }

  setupAccountDetailsForm() {
    const selectedBank = this.banksList.find(
      (bank) => bank.name === this.accountDetails.value["bankName"]
    );
    const accountDetails = {
      bankName: this.accountDetails.value["bankName"],
      bankCode: selectedBank.code,
      holderName: this.accountDetails.value["holderName"],
      accountNo: this.accountDetails.value["accountNo"],
      userId: this.userId,
      type: selectedBank.type,
      recipient_code: "",
    };
    this.addPayoutAccount(accountDetails);
  }

  setupUpdateAccountDetailsForm() {
    const selectedBank = this.banksList.find(
      (bank) => bank.name === this.accountDetails.value["bankName"]
    );
    const accountDetails = {
      bankName: this.accountDetails.value["bankName"],
      bankCode: selectedBank.code,
      holderName: this.accountDetails.value["holderName"],
      accountNo: this.accountDetails.value["accountNo"],
      userId: this.userId,
      type: selectedBank.type,
      recipient_code: "",
    };
    this.updatePayoutAccount(accountDetails);
  }

  getBankList(country) {
    this.transactionService
      .getBanks(country)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.banksData = data?.filter(
          (bank) => bank.type === "ghipss" || bank.type === "nuban"
        );
        this.networkList = data?.filter((bank) => bank.type === "mobile_money");
        this.banksList = data;
        this.bankNames = data?.map((bank) => bank.name);
      });
  }

  updatePayoutAccount(accountDetails) {
    this.isAdding = true;
    this.recipientDetails = {
      type: accountDetails.type,
      name: accountDetails.holderName,
      description: "Noworri Transaction",
      account_number: accountDetails.accountNo,
      bank_code: accountDetails.bankCode,
      currency: this.userData.currency,
      recipient_code: this.businessAccountDetails.recipient_code
    };
    this.transactionService
      .updateRecipient(this.recipientDetails, this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.status === true && response.data?.recipient_code) {
          this.isAdding = false;
          this.toggleUpdateAccountModal();
          this.getBusinessAccountDetails();
        }
        if (response.status === false) {
          this.errorMessage = response.message;
          this.isAdding = false;
        }
        return response;
      });
  }

  deletedAccount(recipient: string) {
    const accountData = {
      recipient_code: recipient,
      currency: this.userData.currency,
    };
    this.transactionService
      .deleteUserAccount(accountData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.getBusinessAccountDetails();
        }
        return response;
      });
  }

  getBusinessAccountDetails() {
    this.transactionService
      .getAccountDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details: any) => {
        this.businessAccountDetails = details.data;
        this.hasPayoutAccount = details.data ? true: false;
        // this.businessAccountDetails = details.data?.find(
        //   (detail) =>
        //     !detail.bank_name.includes("AirtelTigo") &&
        //     !detail.bank_name.includes("Vodafone") &&
        //     !detail.bank_name.includes("MTN")
        // );
        // this.bsuinessWalletDetails = details.data?.find(
        //   (detail) =>
        //     detail.bank_name.includes("AirtelTigo") ||
        //     detail.bank_name.includes("Vodafone") ||
        //     detail.bank_name.includes("MTN")
        // );
        if (
          this.businessAccountDetails &&
          this.businessAccountDetails.length > 2
        ) {
          this.hasMaxAccounts = true;
        } else {
          this.hasMaxAccounts = false;
        }
        // if (this.bsuinessWalletDetails && this.bsuinessWalletDetails.length > 4) {
        //   this.hasMaxWallets = true;
        // } else {
        //   this.hasMaxWallets = false;
        // }
        return details;
      });
  }

  addPayoutAccount(accountDetails) {
    this.isAdding = true;
    this.recipientDetails = {
      type: accountDetails.type,
      name: accountDetails.holderName,
      description: "Noworri Transaction",
      account_number: accountDetails.accountNo,
      bank_code: accountDetails.bankCode,
      currency: this.userData.currency,
    };
    this.transactionService
      .createRecipient(this.recipientDetails, this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.status === true && response.data?.recipient_code) {
          this.isAdding = false;
          this.toggleModal();
          this.getBusinessAccountDetails();
        }
        if (response.status === false) {
          this.errorMessage = response.message;
          this.isAdding = false;
        }
        return response;
      });
  }
}
