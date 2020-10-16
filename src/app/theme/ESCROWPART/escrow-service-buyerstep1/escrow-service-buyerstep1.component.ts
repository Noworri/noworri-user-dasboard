import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { GeoLocationService } from './../../../Service/geo-location.service';
import { HomeInputService } from './../../../Service/home-input.service';


const LOCAL_STORAGE_KEY = 'noworri-escrow-0';
const LOCAL_STORAGE_KEY1 = 'noworri-escrow-service-1';

@Component({
  selector: 'app-escrow-service-buyerstep1',
  templateUrl: './escrow-service-buyerstep1.component.html',
  styleUrls: ['./escrow-service-buyerstep1.component.scss']
})
export class EscrowServiceBuyerstep1Component implements OnInit {
  // --for contry location---//

  countryData: any;

  locationData: string;

  // -----------For input control-----------------------//
  searchInputType1: RegExp;
  searchInputType2: RegExp;

  // --------For date control------------------------//
  minDate: Date;

  // -------------------Date or time variable-------------------//

  trans: string;

  deadlineTypeRadio: FormGroup;
  waitingDisplayInput:boolean;

  // ---------Messages a afficher--------//

  role: string;
  transactionType: string;

  E164PhoneNumber = '+233544990518';

  buyerOrSeller: string;

  // boolean for display hour or days input -----//

  DayInput: boolean;
  HourInput: boolean;

  //  --- input data------//

  serviceName: string;
  sellersPhoneNumber: string;
  price: any;
  revisions: string;
  localDeadineDaysdata: Date;
  deadLineDays: string;
  deadLineHours: string;
  description: string;
  requirement: string;
  files: any;
  filePaths = [];
  uploadedFiles = [];
  userRole: string;
  deadlineDisplay: string;
  uploadFile: any;
  deadLineHoursOrDays: any;

  // ------ //

  acceptServiceName: boolean;
  acceptPhoneNumber: boolean;
  acceptPrice: boolean;
  acceptRevision: boolean;
  acceptDeadLineDays: boolean;
  acceptDeadLineHours: boolean;
  acceptDescription: boolean;
  accceptRequirement: boolean;
  acceptdeadLineHoursOrDay: boolean;
  acceptFile: boolean;


  owner_id: string;
  escrowStep1Data: any;
  transactionSummary: object;
  totalAmount: any;
  orderDetails: string;
  isValidating: boolean;
  noworriFee: any;


  // --------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;
  BoolAffichage8: boolean;

  // ------------Controle de la couleur de la couleur de l'input-------//
  InputControl1 = 'form-control';
  InputControl2 = 'form-control';
  InputControl3 = 'form-control';
  InputControl4 = 'form-control';
  InputControl5 = 'form-control';
  InputControl6 = 'form-control';
  InputControl7 = 'form-control';




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private geoLocationService: GeoLocationService) {
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    this.transactionType = localData.transactionType;
    this.role = localData.role;
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
    this.getDataLocation();

  }
  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }
  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  fescrowStep1(F: NgForm, telInputform) {
    this.isValidating = true;
    this.sellersPhoneNumber = telInputform.value['sellersPhone_number'];
    this.revisions = F.value['revisions'];
    this.localDeadineDaysdata = F.value['deadlineDays'];

    this.deadLineHours = F.value['deadLineHours'];
    this.serviceName = F.value['name'];
    this.description = F.value['description'];
    this.price = parseInt(F.value['price'], 10);
    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount = parseInt(F.value['price'], 10) + this.noworriFee;
    this.deadLineDays = this.localDeadineDaysdata.toLocaleDateString('en-US');
    if (this.deadLineDays) {
      this.deadLineHours === '';
      this.deadLineHoursOrDays = this.deadLineDays;
    } else if (this.deadLineHours) {
      this.deadLineHoursOrDays = this.deadLineHours;
    }
    if (this.serviceName == '') {
      this.InputControl1 = 'form-control is-invalid';
      this.acceptServiceName = false;
    } else if (this.serviceName) {
      this.InputControl1 = 'form-control is-valid';
      this.acceptServiceName = true;
    }
    if (
      this.sellersPhoneNumber
    ) {
      this.InputControl2 = 'form-control is-valid';
      this.acceptPhoneNumber = true;
    } else {
      this.InputControl2 = 'form-control is-invalid';
      this.acceptPhoneNumber = false;
    }
    if (
      this.price
    ) {
      this.InputControl3 = 'form-control is-valid';
      this.acceptPrice = true;
    } else {
      this.InputControl3 = 'form-control is-invalid';
      this.acceptPrice = false;
    }
    if (
      this.revisions
    ) {
      this.InputControl4 = 'form-control is-valid';
      this.acceptRevision = true;
    } else {
      this.InputControl4 = 'form-control is-invalid';
      this.acceptRevision = false;
    }
    if (this.deadLineHoursOrDays) {
      this.InputControl5 = 'form-control is-valid';
      this.acceptdeadLineHoursOrDay = true;
    } else {
      this.InputControl5 = 'form-control is-invalid';
      this.acceptdeadLineHoursOrDay = false;
    }
    // if (this.requirement) {
    //   this.InputControl6 =='form-control is-valid';
    //   this.accceptRequirement = true;
    // } else {
    //   this.InputControl6 == 'form-control is-invalid';
    //   this.accceptRequirement = false;
    // }
    if (this.files) {
      for (const file of Array.from(this.files)) {
        this.uploadFile(file);
      }
    }
    if (this.acceptdeadLineHoursOrDay == true &&
      this.acceptPhoneNumber == true &&
      this.acceptPrice == true &&
      this.acceptRevision == true &&
      this.acceptServiceName == true &&
      this.acceptdeadLineHoursOrDay == true

    ) {
      setTimeout(() => {
        this.transactionSummary = {
          owner_id: this.owner_id,
          item: this.serviceName,
          seller: this.sellersPhoneNumber,
          amount: this.totalAmount.toFixed(2),
          files: this.filePaths,
          uploadedFiles: this.uploadedFiles,
          transactionType: this.transactionType,
          role: this.userRole,
          noworriFee: this.noworriFee.toFixed(2),
          price: this.price.toFixed(2),
          // deadlineType: this.escrowStep1Data.deadlineType,
          // deadline: this.escrowStep1Data.deadline,
          deadlineDisplay: this.deadLineHoursOrDays,
          revision: this.revisions,
        };
        this.orderDetails = JSON.stringify(this.transactionSummary);
        this.isValidating = false;
        localStorage.setItem(LOCAL_STORAGE_KEY1, this.orderDetails);
        this.router.navigate(['/escrowservicebuyerstep2']);
      }, 5000);
    } else {
      this.isValidating = false;
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
    const dealineValue = this.deadlineTypeRadio.value['radio'];
    if (dealineValue === 'Days') {
      this.HourInput = false;
      this.DayInput = true;
    } else if (dealineValue === 'Hours') {
      this.DayInput = false;
      this.HourInput = true;
    }
  }
  // -------for date controle --------------------------------//
  setDateControle() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1)
  }

  // ----for contry location---//

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
