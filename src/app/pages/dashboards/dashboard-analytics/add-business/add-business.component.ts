import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CATEGORIES, COUNTRIES, INDUSTRIES, NATIONALITIES, USER_SESSION_KEY } from 'src/app/Models/constants';
import { BusinessService } from 'src/app/services/business.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';
export const BUSINESS_INFO_KEY = 'businessInfo';

@Component({
  selector: 'vex-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
})
export class AddBusinessComponent implements OnInit {
  panelOpenState = false;
  businessLogoName: string;
  idTypes = [
    'passport',
    'Identity Card',
    'Driving License'
  ]

  businessForm: FormGroup;
  bsnessInfoForm: FormGroup;
  bsnessInfoInputStatus = {
    trading_name: '',
    business_name: '',
    description: '',
    industry: '',
    business_email: '',
    business_phone: '',
    delivery_no: '',
  };
  businessInformation: Object;
  business_email: string;
  emailAdssRegex = /\S+@\S+\.\S+/;

  alertBusinessLogo: boolean;
  businessLogo: File;
  locationData: any;
  countryData: any;
  waitingDisplayInput: boolean;
  prefixCountryCode: any;
  isValidCountry: Boolean;
  businessPhoneNumber: string;
  deliveryPhoneNumber: string;
  bsnessAdressForm: FormGroup;
  bsnessAdressInputStatus = {
    country: '',
    region: '',
    city: '',
    streetAddress: ''
  };
  bsnessOwnerForm: FormGroup;
  businessOwnerInformation: Object;
  bsnessOwnerInputStatus = {
    owner_lname: '',
    owner_fname: '',
    dob: '',
    nationality: '',
    owner_adresse: '',
    identification_document: '',
    is_legally_registered: '',
    business_legal_name: '',
    company_documents: '',
  };
  companyDocuments;
  idDocumentFile: File;
  companyDocumentFile: File;
  unsubscribe$ = new Subject();
  errorMessage: string;

  isIdUpload: boolean;
  isCdUpload: boolean;
  idUploadMessge = 'Upload or drop';
  isCdUploadMessge = 'Upload or drop';
  rawDate = '';
  dateFormated = '';
  isLegalFomDisplay: boolean;
  isLegallyRegistered = '';
  countries = COUNTRIES;
  nationalities = NATIONALITIES;
  categories = CATEGORIES;
  industries = INDUSTRIES;
  selectedFiles: FileList;
  isBusinessSubmitted = false;
  nameValidationPattern = /^[a-zA-Z0-9-\s]{0,25}$/;
  cityValidationPattern = /^[a-zA-Z-'\s]{0,25}$/;
  phoneNumberValidationPattern = /^[0-9]{0,15}$/;

  allCreatBusinessData: object;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private businessService: BusinessService,
    private geoLocationService: GeoLocationService
  ) {
    this.userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
  }

  ngOnInit() {
    this.businessForm = this.formBuilder.group({
      country: ['', Validators.required],
      region: ['', [Validators.required, Validators.pattern(this.cityValidationPattern)]],
      city: ['', [Validators.required, Validators.pattern(this.cityValidationPattern)]],
      streetAddress: ['', Validators.required],
      trading_name: ['', Validators.required],
      business_name: ['', [Validators.required, Validators.pattern(this.nameValidationPattern)]],
      description: ['', Validators.required],
      industry: ['', Validators.required],
      category:['', Validators.required],
      business_email: ['', [Validators.email, Validators.email]],
      business_phone: ['', [Validators.required, Validators.pattern(this.phoneNumberValidationPattern)]],
      delivery_phone: ['',[ Validators.required, Validators.pattern(this.phoneNumberValidationPattern)]],
      owner_lname: ['', Validators.required],
      owner_fname: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      owner_adresse: ['', Validators.required],
      identification_document: ['', Validators.required],
      identification_documentUpload: ['', Validators.required],
      company_documents: ['', Validators.required],
      is_legally_registered: ['', Validators.required],
      business_legal_name: ['', Validators.required],
      company_documentUpload: ['', Validators.required],
      business_logo : ['']
    });
    this.businessPhoneInputStyl();
    this.deliveryManInputStyl();
    this.getLocationData();
  }

  uploadCompanyDoc(event) {
    this.companyDocumentFile = event.target.files[0];
  }

  uploadID(event) {
    this.idDocumentFile = event.target.files[0];
  }

  addBusiness() {
    this.isBusinessSubmitted = true;
    const businessData = this.businessForm.value;
    businessData.identification_documentUpload = this.idDocumentFile;
    businessData.company_documentUpload = this.companyDocumentFile;
    businessData.user_id = this.userData.user_uid;
    this.businessService.createNewBusiness(businessData).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (response: any) => {
        if(response.status = true  && response.data) {
          this.router.navigate(['dashboards'])  
        } else {
          this.errorMessage = response.message || 'something went wrong';
          this.isBusinessSubmitted = false;
        }
      }
    )
    return null;
  }
  
  getBusinessLogo(File) {
    this.businessLogo = File.item(0);
  }

  getLocationData() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    })
      .then(() => {
        if (!this.locationData) {
          this.waitingDisplayInput = false;
        } else {
          this.waitingDisplayInput = true;
          this.countryData = {
            preferredCountries: [`${this.locationData}`],
            localizedCountries: { ng: 'Nigeria', gh: 'Ghana' },
            onlyCountries: ['GH', 'NG'],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === 'GH' ||
          this.locationData.country_code === 'NG'
        ) {
          this.prefixCountryCode = this.locationData.country_calling_code;
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixCountryCode = '+233';
        }
      });
  }

  businessPhoneInputStyl() {
    document
      .getElementsByTagName('input')[4]
      .setAttribute(
        'style',
        'border-radius:6px; opacity: 1;width: 476px;border-color:blue'
      );
  }
  deliveryManInputStyl() {
    document
      .getElementsByTagName('input')[5]
      .setAttribute(
        'style',
        'border-radius:6px; opacity: 1;width: 476px;border-color:blue'
      );
  }

  onSelectIdocument(file: File) {
    this.idDocumentFile = file;
    this.idUploadMessge = this.idDocumentFile['name'];
  }

  onSelectCompanyDocuments(file: File) {
    this.companyDocuments = file;
    this.isCdUploadMessge = this.idDocumentFile['name'];
  }

  processingData(businessOwnerInformation) {
    if (this.isLegallyRegistered === 'NO') {
      businessOwnerInformation.business_legal_name = 'null';
      this.companyDocuments = 'null';
    }
    this.bsnessOwnerInputStatus.owner_fname = businessOwnerInformation.owner_fname
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.owner_lname = businessOwnerInformation.owner_lname
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.dob = businessOwnerInformation.dob
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.nationality = businessOwnerInformation.nationality
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.owner_adresse = businessOwnerInformation.owner_adresse
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.is_legally_registered = businessOwnerInformation.is_legally_registered
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.business_legal_name = businessOwnerInformation.business_legal_name
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.identification_document = businessOwnerInformation.identification_document
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.bsnessOwnerInputStatus.company_documents = this.companyDocuments
      ? 'form-control is-valid'
      : 'form-control is-invalid';
    this.isIdUpload = this.businessOwnerInformation[
      'identification_documentUpload'
    ]
      ? false
      : true;
    this.isCdUpload = this.businessOwnerInformation['company_documentUpload']
      ? false
      : true;
  }
}
