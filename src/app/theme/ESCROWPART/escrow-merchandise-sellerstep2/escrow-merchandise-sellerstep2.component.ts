import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "src/app/Service/transactions.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, NavigationStart } from "@angular/router";
import {
  LOCAL_STORAGE_KEY_MERCHANDISE_0,
  LOCAL_STORAGE_KEY_MERCHANDISE_1,
} from "src/app/shared/constants";

const MERCHANDISE_SELLER2_SESSION_STORAGE_KEY = "noworri-user-session";
const TRANSATION_SUMMURYKEY = "transation-sumary";

@Component({
  selector: "app-escrow-merchandise-sellerstep2",
  templateUrl: "./escrow-merchandise-sellerstep2.component.html",
  styleUrls: ["./escrow-merchandise-sellerstep2.component.scss"],
})
export class EscrowMerchandiseSellerstep2Component implements OnInit {
  price: number;
  noworriFee: number;
  amount: number;
  item: string;
  sellerNumber: string;
  paymentResponse: any;
  isValidating = false;
  email: string;
  first_name: string;
  name: string;
  mobile_phone: string;
  initiator_id: string;
  destinator_id: string;
  initiator_role: string;
  destinator_role: string;
  transactionType: string;
  description: string;
  deliveryPhone: string;
  transaction_ref: string;
  currency: string;
  transactionSummary: any;

  // wholeAmountPart: number;
  // decimalPart: any;

  unsubscribe = new Subject();

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    const sessionData1 = JSON.parse(
      localStorage.getItem(MERCHANDISE_SELLER2_SESSION_STORAGE_KEY)
    );
    const sessionData2 = JSON.parse(
      localStorage.getItem(MERCHANDISE_SELLER2_SESSION_STORAGE_KEY)
    );
    this.first_name = sessionData1.first_name;
    this.email = sessionData1.email;
    this.name = sessionData1.name;
    this.mobile_phone = sessionData2.mobile_phone;
    this.initiator_id = sessionData1.user_uid;
    const escrowStep2Data = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_MERCHANDISE_1)
    );
    this.item = escrowStep2Data.name;
    this.amount = +escrowStep2Data.price - +escrowStep2Data.noworriFee;
    this.sellerNumber = escrowStep2Data.seller;
    this.deliveryPhone = escrowStep2Data.delivery_phone;
    this.initiator_role = escrowStep2Data.role === "buy" ? "buy" : "sell";
    this.destinator_role = this.initiator_role === "buy" ? "sell" : "buy";
    this.transactionType = escrowStep2Data.transaction_type;
    this.noworriFee = escrowStep2Data.noworriFee;
    this.price = escrowStep2Data.price;
    this.description = escrowStep2Data.requirement || "";
    this.destinator_id = escrowStep2Data.destinator_id;
    this.currency = escrowStep2Data.currency;

    this.transactionSummary = {
      initiator_id: this.initiator_id,
      initiator_role: this.initiator_role,
      destinator_id: this.destinator_id,
      transaction_type: this.transactionType,
      delivery_phone: this.deliveryPhone,
      name: this.item,
      price: this.price,
      noworri_fees: this.noworriFee,
      requirement: this.description,
      transaction_ref: null,
      etat: 1,
      currency: this.currency,
    };
  }

  ngOnInit() {}

  onConfirmTransaction() {
    this.createTransaction(this.transactionSummary);
  }

  createTransaction(transactionDetails) {
    //------J'ai fait ca juste pour contunier  j'y viendrai --//
    this.isValidating = true;
    this.transactionsService
      .createTransaction(transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (transaction: any) => {
          if (
            transaction.initiator_id &&
            transaction.initiator_id === this.initiator_id &&
            transaction.initiator_role === "buy"
          ) {
            this.router.navigate([
              `/buyermerchandisecontrat/${transaction.transaction_key}`,
            ]);
          } else if (
            transaction.initiator_id &&
            transaction.initiator_id === this.initiator_id &&
            transaction.initiator_role === "sell"
          ) {
            this.router.navigate([
              `/sellermerchandisecontrat/${transaction.transaction_key}`,
            ]);
          } else {
            console.log("error", transaction);
          }
          return transaction;
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
}
