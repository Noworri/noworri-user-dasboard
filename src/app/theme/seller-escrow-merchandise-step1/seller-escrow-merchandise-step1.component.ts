import { Component, OnInit } from '@angular/core';
import { MerchandiseEscrowStep1Reference, CompanyReference } from 'src/app/Service/reference-data.interface';
import { Router } from '@angular/router';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Service/auth.service';

const LOCAL_STORAGE_KEY_0 = 'noworri-escrow-0';
const LOCAL_STORAGE_KEY_1 = 'merchandise-escrow-1';
const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-seller-escrow-merchandise-step1',
  templateUrl: './seller-escrow-merchandise-step1.component.html',
  styleUrls: ['./seller-escrow-merchandise-step1.component.scss']
})
export class SellerEscrowMerchandiseStep1Component implements OnInit {

  isValidBuyer = true;
  rawSeller: string;
  isValidNumber = true;
  isValidating = false;
  orderDetails: any;
  noworriFee: number;
  totalAmount: number;
  owner_id: string;
  price: number;
  escrowStep1Data: MerchandiseEscrowStep1Reference;
  transactionSummary: any;

  Form: FormGroup;
  amount: number;
  item: string;
  sellerNumber: string;
  paymentResponse: any;
  transactionDetails: object;
  email: string;
  first_name: string;
  name: string;
  mobile_phone: string;
  user_id: string;
  user_role: string;
  owner_role: string;
  transactionType: string;
  description: string;
  deliveryPhone: string;
  wholeAmountPart: number;
  decimalPart: any;

  inputValidation: RegExp;

  // -------------------Date or time variable-------------------//

  DateDisableOrNot = '';
  TimeDisabledOrNot = '';

  // ---------Messages a afficher--------//

  role: string;

  E164PhoneNumber = '+233544990518';

  buyersOrSeller: string;
  Accept1: boolean;
  Accept2 = true;
  Accept3: boolean;
  Accept4: boolean;
  Accept5: boolean;

  // ------------Controle de la couleur de la couleur de l'input-------//
  itemControl = 'form-control';
  sellerPhoneNumberControl = 'form-control';
  deliveryPhoneNumberControl = 'form-control';
  priceControl = 'form-control';
  descriptionControl = 'form-control';

   // --------Boolean-pour activer l'affichage------------//
   BoolAffichage1: boolean;
   BoolAffichage2: boolean;
   BoolAffichage3: boolean;
   BoolAffichage4: boolean;
   BoolAffichage5: boolean;
   BoolAffichage6: boolean;
   BoolAffichage7: boolean;

   unsubscribe = new Subject();


  constructor(    private router: Router,
    private companyService: AuthenticationService,
    private formbuilder: FormBuilder,
    private transactionsService: TransactionsService,

) {
  const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
  this.first_name = sessionData.first_name;
  this.email = sessionData.email;
  this.name = sessionData.name;
  this.mobile_phone = sessionData.mobile_phone;
  this.deliveryPhone = sessionData.delivery;
  this.user_id = sessionData.user_uid;

  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_0));
  // this.user_role = localData.role === 'Buyer' ? 'Buy' : 'Sell';
  // this.owner_role = this.user_role === 'Buy' ? 'Sell' : 'Buy';
  this.user_role = 'Sell';
  this.owner_role = 'Buy';
  this.transactionType = localData.transactionType;

  this.escrowStep1Data = {
    item: '',
    sellerPhoneNumber: '',
    deliveryPhoneNumber: '',
    price: '',
    description: '',
  };
}

getNoworriFee(price) {
  return (price / 100) * 1.95;
}


  ngOnInit() {
  }

  onCompleteStep1(form: NgForm, formDelivery, formSeller) {
    this.escrowStep1Data.item = form.value['item'];
    this.escrowStep1Data.sellerPhoneNumber = `+233${formSeller.value['sellerPhoneNumber']}`;
    this.escrowStep1Data.deliveryPhoneNumber = `+233${formDelivery.value['deliveryPhoneNumber']}`;
    this.escrowStep1Data.price = form.value['price'];
    this.escrowStep1Data.description = form.value['description'];
    this.price = parseInt(this.escrowStep1Data.price, 10);
    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount = parseInt(this.escrowStep1Data.price, 10) + this.noworriFee;
    this.rawSeller = formSeller.value['sellerPhoneNumber'];
    this.isValidating = true;

    this.getBuyerDetails(this.escrowStep1Data.sellerPhoneNumber);

    setTimeout(() => {
      if (this.escrowStep1Data.item === '') {
        this.itemControl = 'form-control is-invalid';
        this.Accept1 = false;
        this.isValidating = false;
      } else {
        this.itemControl = 'form-control is-valid';
        this.Accept1 = true;
      }
      this.inputValidation = /^-?(0|[1-9]\d*)?$/;
      if (
        !this.isValidBuyer ||
        !this.rawSeller ||
        (this.rawSeller && !this.rawSeller.match(this.inputValidation))
      ) {
        this.Accept2 = false;
        this.isValidNumber = false;
        this.isValidating = false;
      } else {
        this.Accept2 = true;
        this.isValidNumber = true;
      }
      if (this.escrowStep1Data.price && !isNaN(this.escrowStep1Data.price)) {
        this.priceControl = 'form-control is-valid';
        this.Accept4 = true;
      } else {
        this.priceControl = 'form-control is-invalid';
        this.Accept4 = false;
        this.isValidating = false;
      }

      this.descriptionControl = 'form-control is-valid';
      this.Accept5 = true;
      if (
        this.Accept1 === true &&
        this.Accept2 === true &&
        this.Accept4 === true &&
        this.Accept5 === true
      ) {
          this.transactionDetails = {
            user_id: this.user_id,
            user_role: this.user_role,
            user_phone: this.mobile_phone,
            owner_id: this.owner_id,
            owner_role: this.owner_role,
            owner_phone: this.escrowStep1Data.sellerPhoneNumber,
            transaction_type: this.transactionType,
            deadline_type: this.escrowStep1Data.deliveryPhoneNumber,
            service: this.escrowStep1Data.item,
            price: this.price,
            noworri_fees: this.noworriFee,
            total_price: this.totalAmount,
            requirement: this.escrowStep1Data.description,
            etat: 1
          };
          this.createTransaction(this.transactionDetails);
          this.isValidating = false;

          setTimeout(() => {
            this.router.navigate(['/transactions']);
          }, 2000);
      }
    }, 5000);
  }

  createTransaction(transactionDetails) {
    this.transactionsService
      .createTransaction(transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        return response;
      },
      error => {
        console.log(error.message);
      }
      );
  }

  getBuyerDetails(sellerPhoneNumber) {
    if (this.rawSeller) {
      this.companyService.getUserDetails(sellerPhoneNumber).subscribe(
        user => {
          if (isEmpty(user)) {
            this.isValidBuyer = false;
          } else {
            this.isValidBuyer = true;
            this.owner_id = user.user_uid;
          }
        },
        (error) => {
          this.isValidBuyer = false;
          console.log('Error %j', error.message);
        }
      );
    }
  }


  // ------Affichage de chaque side a chaque click dans le champs correspondant-----------//

  AfficheSide1() {
    this.BoolAffichage1 = true;
    if ((this.BoolAffichage1 = true)) {
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide2() {
    this.BoolAffichage2 = true;
    if ((this.BoolAffichage2 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide3() {
    this.BoolAffichage3 = true;
    if ((this.BoolAffichage3 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide4() {
    this.BoolAffichage4 = true;
    if ((this.BoolAffichage4 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }

  AfficheSide5() {
    this.BoolAffichage5 = true;
    if ((this.BoolAffichage5 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }


}
