import { Router } from '@angular/router';
import { Escrowstep1Service } from './../../Service/escrowstep1.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HomeInputService } from './../../Service/home-input.service';

import { Component, OnInit } from '@angular/core';
import {
  ServiceEscrowStep1Reference,
  CompanyReference,
} from 'src/app/Service/reference-data.interface';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { isEmpty } from 'lodash';
import { AuthService } from 'src/app/Service/auth.service';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const LOCAL_STORAGE_KEY0 = 'noworri-escrow-0';
const LOCAL_STORAGE_KEY1 = 'noworri-escrow-service-1';

@Component({
  selector: 'app-escrow-step1',
  templateUrl: './escrow-step1.component.html',
  styleUrls: ['./escrow-step1.component.scss'],
})
export class EscrowStep1Component implements OnInit {
  isValidSeller = true;
  rawSeller: string;
  isValidNumber = true;
  isValidating = false;
  orderDetails: any;
  noworriFee: number;
  totalAmount: number;
  owner_id: string;
  price: number;
  escrowStep1Data: ServiceEscrowStep1Reference;
  transactionSummary: any;
  deadline: string;
  revisions: any;
  deadlineDisplay: string;
  files: any;
  filePaths = [];
  uploadedFiles = [];

  // -----------For input control-----------------------//
  searchInputType1: RegExp;
  searchInputType2: RegExp;

  // --------For date control------------------------//
  minDate: Date;

  // -------------------Date or time variable-------------------//

  deadlineTypeRadio: FormGroup;

  // ---------Messages a afficher--------//

  role: string;
  userRole: string;
  transactionType: string;

  E164PhoneNumber = '+233544990518';

  buyerOrSeller: string;

  // boolean for display hour or days input -----//

  DayInput: boolean;
  HourInput: boolean;

  // --------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;
  BoolAffichage8: boolean;

  Accept1: boolean;
  Accept2: boolean;
  Accept3: boolean;
  Accept4: boolean;
  Accept5: boolean;
  Accept6: boolean;

  // ------------Controle de la couleur de la couleur de l'input-------//
  InputControl1 = 'form-control';
  InputControl2 = 'form-control';
  InputControl3 = 'form-control';
  InputControl4 = 'form-control';
  InputControl5 = 'form-control';
  InputControl6 = 'form-control';
  InputControl7 = 'form-control';

  unsubscribe = new Subject();

  constructor(
    // private HomeInputService: HomeInputService,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: NoworriSearchService,
    private userService: AuthService,
    private transactionsService: TransactionsService
  ) {
    this.escrowStep1Data = {
      item: '',
      sellerPhoneNumber: '',
      deadline: '',
      deadlineType: '',
      revisionNo: '',
      file: '',
      price: '',
      description: '',
    };
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY0));
    this.transactionType = localData.transactionType;
    this.userRole = localData.role;
    if (localData.role === 'Buyer') {
      this.buyerOrSeller = `Seller's`;
      this.role = 'Buying';
    } else {
      this.buyerOrSeller = `Buyer's`;
      this.role = 'Selling';
    }
    this.setDateControle();
  }

  ngOnInit() {
    this.TransationDeadInit();
  }

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }

  upload(files: FileList) {
    this.files = files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i].name);
    }
    console.log('uploadedFiles', this.uploadedFiles);
    console.log('file', this.files);
    }

  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  fescrowStep1(form: NgForm, formTel) {
    if (form.value) {
      this.escrowStep1Data.item = form.value['item'];
      this.escrowStep1Data.sellerPhoneNumber = `+233${formTel.value['phone_number']}`;
      if (this.owner_id === this.escrowStep1Data.sellerPhoneNumber) {
        this.isValidSeller = false;
      }
      this.escrowStep1Data.price = form.value['price'];
      this.escrowStep1Data.revisionNo = form.value['revisions'];
      const deadlineType = this.deadlineTypeRadio.get('radio').value;
      this.escrowStep1Data.deadlineType = deadlineType;
      // this.file = form.value['fileUpload[]'];
      let deadline = '';
      if (form.value['deadlineDays']) {
        this.deadlineDisplay = form.value['deadlineDays'].toLocaleDateString();
        deadline = new Date(form.value['deadlineDays']).toISOString().slice(0, 19).replace('T', ' ');
      } else if (form.value['deadlineTime']) {
        this.deadlineDisplay = form.value['deadlineTime'];
        const deadlineTime = form.value['deadlineTime'];
        const today =  new Date().toJSON().slice(0, 10);
        deadline = `${today} ${deadlineTime}`;
      }
      this.escrowStep1Data.deadline = deadline;
      this.escrowStep1Data.description = form.value['description'];
      this.revisions = this.escrowStep1Data.revisionNo;
      this.price = parseInt(this.escrowStep1Data.price, 10);
      this.noworriFee = this.getNoworriFee(this.price);
      this.totalAmount =
        parseInt(this.escrowStep1Data.price, 10) + this.noworriFee;
      this.rawSeller = formTel.value['phone_number'];
      this.isValidating = true;

      // this.getCompanyDetails(this.escrowStep1Data.sellerPhoneNumber);
      this.getSellerDetails(this.escrowStep1Data.sellerPhoneNumber);

      setTimeout(() => {
        if (this.escrowStep1Data.item === '') {
          this.InputControl1 = 'form-control is-invalid';
          this.Accept1 = false;
          this.isValidating = false;
        } else if (this.escrowStep1Data.item) {
          this.InputControl1 = 'form-control is-valid';
          this.Accept1 = true;
        }
        this.searchInputType1 = /^-?(0|[1-9]\d*)?$/;
        if (
          (this.escrowStep1Data.sellerPhoneNumber &&
          this.escrowStep1Data.sellerPhoneNumber.match(this.searchInputType1)) ||
          (this.rawSeller && this.isValidSeller)
        ) {
          this.InputControl2 = 'form-control is-valid';
          this.Accept2 = true;
          this.isValidNumber = true;
        } else {
          this.InputControl2 = 'form-control is-invalid';
          this.Accept2 = false;
          this.isValidating = false;
          this.isValidNumber = false;
        }
        this.searchInputType2 = /^\d*\d*$/;
        if (
          this.escrowStep1Data.price &&
          this.escrowStep1Data.price.match(this.searchInputType2)
        ) {
          this.InputControl3 = 'form-control is-valid';
          this.Accept3 = true;
        } else {
          this.InputControl3 = 'form-control is-invalid';
          this.Accept3 = false;
          this.isValidating = false;
        }
        this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
        if (
          this.escrowStep1Data.revisionNo &&
          this.escrowStep1Data.revisionNo.match(this.searchInputType2) &&
          this.escrowStep1Data.revisionNo <= 10
        ) {
          this.InputControl4 = 'form-control is-valid';
          this.Accept4 = true;
        } else {
          this.InputControl4 = 'form-control is-invalid';
          this.Accept4 = false;
          this.isValidating = false;
        }
        this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
        // if (
        //   this.EscrowStep1.inputGroupSelect5 &&
        //   this.EscrowStep1.inputGroupSelect5.match(this.searchInputType2)
        // ) {
        //   this.InputControl5 = 'form-control is-valid';
        //   this.Accept5 = true;
        // } else {
        //   this.InputControl5 = 'form-control is-invalid';
        //   this.Accept5 = false;
        // }
        if (this.escrowStep1Data.description === '') {
          this.InputControl6 = 'form-control is-invalid';
          this.Accept6 = false;
          this.isValidating = false;
        } else if (this.escrowStep1Data.description) {
          this.InputControl6 = 'form-control is-valid';
          this.Accept6 = true;
        }
        if (
          this.Accept1 === true &&
          this.Accept2 === true &&
          this.Accept3 === true &&
          this.Accept4 === true &&
          this.Accept6 === true
        ) {
          if (this.files) {
            for (const file of Array.from(this.files)) {
              this.uploadFile(file);
            }
          }
          setTimeout(() => {
          console.log('filePaths', this.filePaths);
          this.transactionSummary = {
            owner_id: this.owner_id,
            item: this.escrowStep1Data.item,
            seller: this.escrowStep1Data.sellerPhoneNumber,
            amount: this.totalAmount.toFixed(2),
            description: this.escrowStep1Data.description,
            files: this.filePaths,
            uploadedFiles: this.uploadedFiles,
            transactionType: this.transactionType,
            role: this.userRole,
            noworriFee: this.noworriFee.toFixed(2),
            price: this.price.toFixed(2),
            deadlineType: this.escrowStep1Data.deadlineType,
            deadline: this.escrowStep1Data.deadline,
            deadlineDisplay: this.deadlineDisplay,
            revision: this.revisions,
          };
          this.orderDetails = JSON.stringify(this.transactionSummary);
          this.isValidating = false;
          localStorage.setItem(LOCAL_STORAGE_KEY1, this.orderDetails);
            this.router.navigate(['/escrowstep2']);
          }, 5000);
        }
      }, 1000);
    }
  }

  uploadFile(file) {
    if (this.rawSeller) {
      this.transactionsService.uploadFile(file).subscribe(
        (response: any) => {
          if (response.path) {
            this.filePaths.push(response.path);
            console.log('filePaths after upload', this.filePaths);
          }
        },
        (error) => {
          this.isValidSeller = false;
          console.log('Error %j', error.message);
        }
      );
    }
  }

  getSellerDetails(buyerPhone) {
    this.userService.getUserDetails(buyerPhone).subscribe(
      (user) => {
        if (isEmpty(user)) {
          this.isValidSeller = false;
        } else {
          this.isValidSeller = true;
          this.owner_id = user.user_uid;
        }
      },
      (error) => {
        console.log('Error %j', error.message);
      }
    );
  }

  getCompanyDetails(sellerPhoneNumber) {
    if (this.rawSeller) {
      this.companyService.getCompanyDetails(sellerPhoneNumber).subscribe(
        (company: CompanyReference) => {
          if (isEmpty(company)) {
            this.isValidSeller = false;
          } else {
            this.isValidSeller = true;
            this.owner_id = company.user_id;
          }
        },
        (error) => {
          this.isValidSeller = false;
          console.log('Error %j', error.message);
        }
      );
    }
  }

  // ------Affichage de chaque side a chaque click dans le chanps corespondant-----------//

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
  AfficheSide6() {
    this.BoolAffichage6 = true;
    if ((this.BoolAffichage6 = true)) {
      this.BoolAffichage1 = true;
      this.BoolAffichage2 = true;
      this.BoolAffichage3 = true;
      this.BoolAffichage4 = true;
      this.BoolAffichage5 = true;
      this.BoolAffichage7 = true;
    }
  }
  AfficheSide7() {
    this.BoolAffichage7 = true;
    if ((this.BoolAffichage7 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
    }
  }
  AfficheSide8() {
    this.BoolAffichage8 = true;
    if ((this.BoolAffichage8 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }

  // ----------------transation dead line button methode-----------------------//
  TransationDeadInit() {
    this.deadlineTypeRadio = this.formBuilder.group({
      radio: '',
    });
  }
  getDeadlineType() {
    const deadlineType = this.deadlineTypeRadio.get('radio').value;
    if (deadlineType === 'Days') {
      this.HourInput = false;
      this.DayInput = true;
    } else if (deadlineType === 'Hours') {
      this.DayInput = false;
      this.HourInput = true;
    }
  }
  // -------for date controle --------------------------------//
  setDateControle() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }
}
