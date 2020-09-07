import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { takeUntil } from 'rxjs/operators';

const LOCAL_STORAGE_KEY1 = 'noworri-escrow-service-1';
const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-escrow-step2',
  templateUrl: './escrow-step2.component.html',
  styleUrls: ['./escrow-step2.component.scss']
})
export class EscrowStep2Component implements OnInit {
  CreditCard: boolean;
  Mobilewalet: boolean;
  Form: FormGroup;
  price: number;
  noworriFee: number;
  amount: number;
  item: string;
  sellerNumber: string;
  paymentResponse: any;
  isValidating = false;
  transactionDetails: any;
  email: string;
  first_name: string;
  name: string;
  mobile_phone: string;
  user_id: string;
  owner_id: string;
  user_role: string;
  owner_role: string;
  transactionType: string;
  description: string;
  deadline: string;
  deadlineType: string;
  revisions: string;
  deadlineCheckout: string;
  files: any;
  transactionId: any;
  uploadedFiles: any;

  wholeAmountPart: number;
  decimalPart: any;

  unsubscribe = new Subject();

  constructor(private router: Router,
    private formbuilder: FormBuilder,
    private transactionsService: TransactionsService,
) {
  const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = sessionData.first_name;
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.user_id = sessionData.user_uid;
    const escrowStep2Data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1));
    this.item = escrowStep2Data.item;
    this.uploadedFiles = escrowStep2Data.uploadedFiles;
    if (!this.uploadedFiles.length) {
      this.uploadedFiles = 'N/A';
    }
    this.files = escrowStep2Data.files;
    this.amount = escrowStep2Data.amount;
    this.sellerNumber = escrowStep2Data.seller;
    this.user_role = escrowStep2Data.role === 'Buyer' ? 'Buy' : 'Sell';
    this.owner_role = this.user_role === 'Buy' ? 'Sell' : 'Buy';
    this.transactionType = escrowStep2Data.transactionType;
    this.noworriFee = escrowStep2Data.noworriFee;
    this.revisions = escrowStep2Data.revision;
    this.price = escrowStep2Data.price;
    this.deadline = escrowStep2Data.deadline;
    this.deadlineCheckout = escrowStep2Data.deadlineDisplay;
    this.deadlineType = escrowStep2Data.deadlineType;
    this.description = escrowStep2Data.description || '';
    this.owner_id = escrowStep2Data.owner_id;
    this.wholeAmountPart = Math.trunc(this.amount);
    this.decimalPart = parseFloat(
      Math.abs(this.amount).toString().split('.')[1]
    );
    if (!this.decimalPart) {
      this.decimalPart = '00';
    }
    this.transactionDetails = {
      user_id: this.user_id,
      user_role: this.user_role,
      user_phone: this.mobile_phone,
      owner_id: this.owner_id,
      owner_role: this.owner_role,
      owner_phone: this.sellerNumber,
      transaction_type: this.transactionType,
      deadline: this.deadline,
      deadline_type: this.deadlineType,
      revision: this.revisions,
      service: this.item,
      price: this.price,
      noworri_fees: this.noworriFee,
      total_price: this.amount,
      requirement: this.description,
      file_path: this.files.toString(),
      etat: 2
    };
}

  ngOnInit() {
  }

  RoutingToTransation() {
    this.router.navigate(['/transactions']);
  }

  mapUploadedFiles() {
    this.transactionsService.mapUploadedFiles(this.transactionId, this.files).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      return response;
    });

  }

  createTransaction() {
    this.isValidating = true;
    this.transactionsService
      .createTransaction(this.transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((transaction: any) => {
          this.isValidating = false;
          this.transactionId = transaction.id;
          this.mapUploadedFiles();
          if (transaction.user_id === this.user_id && transaction.user_role === 'Buy') {
            this.router.navigate([`/buyerservicescontrat/${transaction.transaction_key}`]);
          } else if (transaction.user_id === this.user_id && transaction.user_role === 'Sell') {
            this.router.navigate([`/sellerservicescontrat/${transaction.transaction_key}`]);
          }
        return transaction;
      },
      error => {
        console.log(error.message);
      }
      );
  }
}
