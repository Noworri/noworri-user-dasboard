import { AuthserviceService } from './../../../Service/authservice.service';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { MerchandiseEscrowStep1Reference, CompanyReference } from 'src/app/Service/reference-data.interface';
import { Router } from '@angular/router';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeoLocationService } from '../../../Service/geo-location.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



const LOCAL_STORAGE_KEY_0 = 'noworri-escrow-0';
const LOCAL_STORAGE_KEY_1 = 'merchandise-escrow-1';
const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-escrow-merchandise-sellerstep1',
  templateUrl: './escrow-merchandise-sellerstep1.component.html',
  styleUrls: ['./escrow-merchandise-sellerstep1.component.scss']
})
export class EscrowMerchandiseSellerstep1Component implements OnInit {
  isValidBuyer = true;
  rawSeller: string;
  isValidNumber = true;
  isValidating = false;
  orderDetails: any;
  noworriFee: number;
  totalAmount: number;
  destinator_id: string;
  price: number;
  escrowStep1Data: MerchandiseEscrowStep1Reference;
  transactionSummary: any;
  currency: string;

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
  initiator_id: string;
  initiator_role: string;
  destinator_role: string;
  transactionType: string;
  description: string;
  deliveryPhone: string;
  wholeAmountPart: number;
  decimalPart: any;
  waitingDisplayInput:boolean;

  inputValidation: RegExp;

  // -------------------Date or time variable-------------------//

  DateDisableOrNot = '';
  TimeDisabledOrNot = '';



  // ---for contry location ----//
  countryData: any;
  locationData: string;
  displayInput: boolean;

  // ---------Messages a afficher--------//

  role: string;
  E164PhoneNumber = '+233544990518';
  prefixCountryCode: string;
  buyersOrSeller: string;
  accept1: boolean;
  accept2 = true;
  accept3: boolean;
  accept4: boolean;
  accept5: boolean;

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

  modalRef: BsModalRef;



  constructor(
    private router: Router,
    private userService: AuthserviceService,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
    private transactionsService: TransactionsService,
    private geoLocationService: GeoLocationService

  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = sessionData.first_name;
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.deliveryPhone = sessionData.delivery;
    this.initiator_id = sessionData.user_uid;
    if (this.mobile_phone.includes('233')) {
      this.currency = 'GHS';
    } else {
      this.currency = 'NGN';
    }


    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_0));
    this.initiator_role = localData.role === 'Buyer' ? 'buy' : 'sell';
    this.destinator_role = this.initiator_role === 'buy' ? 'sell' : 'buy';
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
    return (price / 100) * 1.98;
  }


  ngOnInit() {
    this.getDataLocation();
  }

  onConfirmTransaction() {
    this.createTransaction(this.transactionSummary);
  }

  onCompleteStep1(recap, form: NgForm, sellersForms, deliveryForms) {
    const telInputPlaceholderInputValue = document
      .getElementsByTagName('input')[0]
      .getAttribute('placeholder');
    const intelInputId = document
      .getElementsByTagName('input')[0]
      .getAttribute('data-intl-tel-input-id');
    if (telInputPlaceholderInputValue === '023 123 4567') {
      this.prefixCountryCode = '+233';
    } else if (telInputPlaceholderInputValue === '0802 123 4567') {
      this.prefixCountryCode = '+234';
    } else if (intelInputId === '2' ) {
      this.prefixCountryCode = '+225';
    }

    this.escrowStep1Data.item = form.value['item'];
    this.escrowStep1Data.price = form.value['price'];
    this.escrowStep1Data.sellerPhoneNumber = `${this.prefixCountryCode}${sellersForms.value['sellerPhoneNumber']}`;
    this.escrowStep1Data.deliveryPhoneNumber =
      deliveryForms.value['deliveryPhoneNumber'] !== undefined
        ? `${this.prefixCountryCode}${deliveryForms.value['deliveryPhoneNumber']}`
        : `${this.prefixCountryCode}${sellersForms.value['sellerPhoneNumber']}`;

    this.escrowStep1Data.description = form.value['description'];
    this.price = parseInt(this.escrowStep1Data.price, 10);
    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount =
      parseInt(this.escrowStep1Data.price, 10) - this.noworriFee;
    this.rawSeller = sellersForms.value['sellerPhoneNumber'];
    this.isValidating = true;
    this.getBuyerDetails(this.escrowStep1Data.sellerPhoneNumber, recap);
  }

  processFormData(recap) {
    if (this.escrowStep1Data.item === '') {
      this.itemControl = 'form-control is-invalid';
      this.accept1 = false;
      this.isValidating = false;
    } else {
      this.itemControl = 'form-control is-valid';
      this.accept1 = true;
    }
    this.inputValidation = /^-?(0|[1-9]\d*)?$/;
    if (
      !this.isValidBuyer ||
      !this.escrowStep1Data.sellerPhoneNumber ||
      (this.escrowStep1Data.sellerPhoneNumber &&
        !this.escrowStep1Data.sellerPhoneNumber.match(this.inputValidation))
    ) {
      this.accept3 = true;
      this.accept4 = true;
      this.isValidNumber = true;
      this.isValidating = false;
    } else {
      this.accept3 = true;
      this.accept4 = true;
      this.isValidNumber = true;
    }
    if (this.escrowStep1Data.price && !isNaN(this.escrowStep1Data.price)) {
      this.priceControl = 'form-control is-valid';
      this.accept2 = true;
    } else {
      this.priceControl = 'form-control is-invalid';
      this.accept2 = false;
      this.isValidating = false;
    }

    if (this.escrowStep1Data.description === '') {
      this.descriptionControl = 'form-control is-invalid';
    } else {
      this.descriptionControl = 'form-control is-valid';
      this.accept5 = true;
    }
    if (
      this.accept1 === true &&
      this.accept2 === true &&
      this.accept4 === true &&
      this.accept5 === true
    ) {
      this.transactionSummary = {
        initiator_role: this.initiator_role,
        initiator_id: this.initiator_id,
        name: this.escrowStep1Data.item,
        destinator_id: this.destinator_id,
        requirement: this.escrowStep1Data.description,
        transaction_type: this.transactionType,
        price: this.price.toFixed(2),
        delivery_phone: this.escrowStep1Data.deliveryPhoneNumber,
        transaction_ref: '',
        etat: 1
      };
      this.openModal(recap);
      this.isValidating = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  createTransaction(transactionDetails) {
    this.transactionsService
      .createTransaction(transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((transaction: any) => {
        if (transaction.initiator_id && transaction.initiator_id === this.initiator_id && transaction.initiator_role === 'buy') {
          this.router.navigate([`/buyermerchandisecontrat/${transaction.transaction_key}`]);
        } else if (transaction.initiator_id && transaction.user_id === this.initiator_id && transaction.initiator_role === 'sell') {
          this.router.navigate([`/sellermerchandisecontrat/${transaction.transaction_key}`]);
        } else {
          console.log('error', transaction);
        }
        return transaction;
      },
        error => {
          console.log(error.message);
        }
      );
  }

  getBuyerDetails(sellerPhoneNumber, recap) {
      this.userService.getUserDetails(sellerPhoneNumber).subscribe(
        user => {
          if (isEmpty(user)) {
            this.isValidBuyer = false;
          } else {
            this.isValidBuyer = true;
            this.destinator_id = user.user_uid;
            this.processFormData(recap);
          }
        },
        (error) => {
          this.isValidBuyer = false;
          console.log('Error %j', error.message);
        }
      );
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

  getDataLocation() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve(this.locationData = data['country'])
      });
    }).then(() => {
      this.countryData = {
        preferredCountries: [`${this.locationData}`],
        localizedCountries: { ng: 'Nigeria', gh: 'Ghana' },
        onlyCountries: ['GH', 'NG']
      };
    }).then(() => {
      this.waitingDisplayInput = true;
    });
  }


}
