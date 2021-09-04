import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BUSINESS_DATA_KEY, USER_SESSION_KEY } from 'src/app/Models/constants';
import { UserSession } from 'src/app/Models/interfaces';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'vex-add-payout-account-modal',
  templateUrl: './add-payout-account-modal.component.html',
  styleUrls: ['./add-payout-account-modal.component.scss']
})
export class AddPayoutAccountModalComponent implements OnInit {
  configs: any;
  userData: UserSession;
  userBusinessData: any;
  showModal = false;
  showUpdateModal = false;
  userId: string;
  businessAccountDetails: any;
  isAdding = false;
  recipientDetails: any;
  errorMessage: string;
  accountDetailsForm: FormGroup;
  bsuinessWalletDetails: any;
  hasMaxAccounts: boolean;
  hasMaxWallets: boolean;
  banksData = [];
  networkList = [];
  banksList = [];
  bankNames = [];
  country: string;
  hasPayoutAccount = false;
  validationMessages = {
    accountNo: {
      required: "Account Number  is required.",
      pattern: "Only digits allowed",
    },
    bankName: {
      required: "Bank Name is required",
    },
    holderName: {
      required: "Holder Name is required",
    },
  };

  unsubscribe$ = new Subject();

  constructor(
    private transactionService: TransactionsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.configs = data;
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    this.userId = this.userData.user_uid;
    if (this.userData.currency === "GHS") {
      this.country = "Ghana";
    } else {
      this.country = "Nigeria";
    }

  }

  
  openSnackbar(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }

  
  ngOnInit(): void {
    this.getBankList(this.country);

    this.getBusinessAccountDetails();
    this.accountDetailsForm = this.formBuilder.group({
      bankName: ["", Validators.required],
      holderName: ["", Validators.required],
      accountNo: ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleUpdateAccountModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }

  setupAccountDetailsForm() {
    const selectedBank = this.banksList.find(
      (bank) => bank.name === this.accountDetailsForm.value["bankName"]
    );
    const accountDetails = {
      bankName: this.accountDetailsForm.value["bankName"],
      bankCode: selectedBank.code,
      holderName: this.accountDetailsForm.value["holderName"],
      accountNo: this.accountDetailsForm.value["accountNo"],
      userId: this.userId,
      type: selectedBank.type,
      recipient_code: "",
    };
    this.addPayoutAccount(accountDetails);
  }

  setupUpdateAccountDetailsForm() {
    const selectedBank = this.banksList.find(
      (bank) => bank.name === this.accountDetailsForm.value["bankName"]
    );
    const accountDetails = {
      bankName: this.accountDetailsForm.value["bankName"],
      bankCode: selectedBank.code,
      holderName: this.accountDetailsForm.value["holderName"],
      accountNo: this.accountDetailsForm.value["accountNo"],
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
      recipient_code: this.businessAccountDetails.recipient_code,
    };
    this.transactionService
      .updateRecipient(this.recipientDetails, this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.status === true && response.data?.recipient_code) {
          this.isAdding = false;
          this.close('');
          this.openSnackbar('Payout Account Updated Successfully!');
          this.getBusinessAccountDetails();
        }
        if (response.status === false) {
          this.errorMessage = response.message;
          this.isAdding = false;
        }
        return response;
      },
      
      (error) => {
        this.isAdding = false;
        this.errorMessage = "Something went wrong please try again";
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
          this.openSnackbar('Payout Account deleted Successfully!');
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
        this.hasPayoutAccount = details.data ? true : false;
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
          this.close('');
          this.openSnackbar('Payout Account Added Successfully!');
          this.getBusinessAccountDetails();
        }
        if (response.status === false) {
          this.errorMessage = response.message;
          this.isAdding = false;
        }
        return response;
      });
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
