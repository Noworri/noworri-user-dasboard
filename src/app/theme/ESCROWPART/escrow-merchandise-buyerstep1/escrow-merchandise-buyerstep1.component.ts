import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  MerchandiseEscrowStep1Reference,
  CompanyReference,
} from 'src/app/Service/reference-data.interface';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { isEmpty } from 'lodash';
import { GeoLocationService } from './../../../Service/geo-location.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const LOCAL_STORAGE_KEY = 'merchandise-escrow-1';

@Component({
  selector: 'app-escrow-merchandise-buyerstep1',
  templateUrl: './escrow-merchandise-buyerstep1.component.html',
  styleUrls: ['./escrow-merchandise-buyerstep1.component.scss'],
})
export class EscrowMerchandiseBuyerstep1Component implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();

  isValidSeller = true;
  rawSeller: string;
  isValidNumber = true;
  isValidating = false;
  orderDetails: any;
  noworriFee: number;
  totalAmount: number;
  destinator_id: string;
  price: number;
  escrowStep1Data: MerchandiseEscrowStep1Reference;
  transactionSummary: object;

  inputValidation: RegExp;

  // ------------for contry location----- //

  countryData: any;

  locationData: string;

  displayInput: boolean;

  // -------------------Date or time variable-------------------//

  DateDisableOrNot = '';
  TimeDisabledOrNot = '';

  // ---------Messages a afficher--------//

  role: string;
  transactionType: string;

  E164PhoneNumber = '+233544990518';

  buyersOrSeller: string;
  // --------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;

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

  constructor(
    private router: Router,
    private companyService: NoworriSearchService,
    private geoLocationService: GeoLocationService
  ) {
    const localData = JSON.parse(localStorage.getItem('noworri-escrow-0'));
    this.transactionType = localData.transactionType;
    this.role = localData.role;
    this.destinator_id = '';
    this.escrowStep1Data = {
      item: '',
      sellerPhoneNumber: '',
      deliveryPhoneNumber: '',
      price: '',
      description: '',
    };
  }

  ngOnInit() {
    this.getDataLocation();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }
  onCompleteStep1(F: NgForm, sellersForms, deliveryForms) {
    this.escrowStep1Data.item = F.value['item'];
    this.escrowStep1Data.price = F.value['price'];
    this.escrowStep1Data.sellerPhoneNumber = `+233${sellersForms.value['sellerPhoneNumber']}`;
    this.escrowStep1Data.deliveryPhoneNumber = deliveryForms.value['deliveryPhoneNumber'] !== undefined ?
      `+233${deliveryForms.value['deliveryPhoneNumber']}` :
      `+233${sellersForms.value['sellerPhoneNumber']}`;
    this.escrowStep1Data.description = F.value['description'];
    this.price = parseInt(this.escrowStep1Data.price, 10);
    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount =
    parseInt(this.escrowStep1Data.price, 10) + this.noworriFee;
    this.rawSeller = sellersForms.value['sellerPhoneNumber']
    this.isValidating = true;
    this.getSellerDetails(this.escrowStep1Data.sellerPhoneNumber);
  }

  processFormData() {
    if (this.escrowStep1Data.item === '') {
      this.itemControl = 'form-control is-invalid';
      this.Accept1 = false;
      this.isValidating = false;
    } else {
      this.itemControl = 'form-control is-valid';
      this.Accept1 = true;
    }
    this.inputValidation = /^-?(0|[1-9]\d*)?$/;
    // if (
    // !this.isValidSeller ||
    //   !this.escrowStep1Data.sellerPhoneNumber ||
    //   (this.escrowStep1Data.sellerPhoneNumber && !this.escrowStep1Data.sellerPhoneNumber.match(this.inputValidation))
    // ) {
    //   this.Accept2 = false;
    //   this.isValidNumber = false;
    //   this.isValidating = false;
    // } else {
    //   this.Accept2 = true;
    //   this.isValidNumber = true;
    // }
    if (this.escrowStep1Data.price && !isNaN(this.escrowStep1Data.price)) {
      this.priceControl = 'form-control is-valid';
      this.Accept4 = true;
    } else {
      this.priceControl = 'form-control is-invalid';
      this.Accept4 = false;
      this.isValidating = false;
    }

    if (this.escrowStep1Data.description === '') {
      this.descriptionControl = 'form-control is-invalid';
    } else {
      this.descriptionControl = 'form-control is-valid';
      this.Accept5 = true;
    }
    if (
      this.Accept1 === true &&
      this.Accept2 === true &&
      this.Accept4 === true &&
      this.Accept5 === true
    ) {
        this.transactionSummary = {
          destinator_id: this.destinator_id,
          item: this.escrowStep1Data.item,
          seller: this.escrowStep1Data.sellerPhoneNumber,
          amount: this.totalAmount.toFixed(2),
          description: this.escrowStep1Data.description,
          transactionType: this.transactionType,
          role: this.role,
          noworriFee: this.noworriFee.toFixed(2),
          price: this.price.toFixed(2),
          delivery: this.escrowStep1Data.deliveryPhoneNumber,
        };
        this.orderDetails = JSON.stringify(this.transactionSummary);
        localStorage.setItem(LOCAL_STORAGE_KEY, this.orderDetails);
        this.isValidating = false;
        this.router.navigate(['/escrowmerchandisebuyerstep2']);
    }
  }

  getSellerDetails(sellerPhoneNumber) {
    if (this.rawSeller) {
      this.companyService.getCompanyDetails(sellerPhoneNumber)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (company: CompanyReference) => {
          if (isEmpty(company)) {
            // this.isValidSeller = false;
            // this.isValidating = false;
          } else {
            this.isValidSeller = true;
            this.destinator_id = company.user_id;
            this.processFormData();
          }
          return sellerPhoneNumber;
        },
        (error) => {
          this.isValidSeller = false;
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

  RoutToStep2() {
    this.router.navigate(['/escrowmerchandisestep2']);
  }

  getDataLocation() {
    this.geoLocationService.getLocation().subscribe((data) => {
      this.locationData = data['country'];
      if (this.locationData) {
        this.displayInput = true;
      }
      this.countryData = {
        preferredCountries: [`${this.locationData}`],
        localizedCountries: { ng: 'Nigeria', gh: 'Ghana', ci: 'Côte d Ivoire' },
        onlyCountries: ['GH', 'NG', 'BJ'],
      };
    });
  }
}
