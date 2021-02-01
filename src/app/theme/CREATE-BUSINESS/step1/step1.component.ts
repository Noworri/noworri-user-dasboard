import { GeoLocationService } from 'src/app/Service/geo-location.service';
import { CreateBusinessService } from './../../../Service/create-business.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


const businessInformation = "businessInfo";
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {


  bsnessInfoForm: FormGroup;
  bsnessInfoInputStatus = {
    trading_name: '',
    business_name: '',
    description: '',
    industry: '',
    business_email: '',
    business_phone: '',
    delivery_no: ''
  }
  businessInformation: Object;
  business_email: string;
  emailAdssRegex = /\S+@\S+\.\S+/


  alertBusinessLogo: boolean;
  businessLogo: File;
  locationData: any;
  countryData: any;
  waitingDisplayInput: boolean
  prefixContryCode: any;
  isValidCountry: Boolean;
  businessPhoneNumber: string;
  deliveryPhoneNumber: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private createBusines: CreateBusinessService,
    private geoLocationService: GeoLocationService,) { }

  ngOnInit() {
    this.businessFormInit();
    this.businessPhoneInputStyl();
    this.deliveryManInputStyl();
    this.getLocationData()

  }
  businessFormInit() {
    this.bsnessInfoForm = this.formBuilder.group({
      trading_name: '',
      business_name: '',
      description: '',
      industry: '',
      business_email: '',
    })
  }

  onSaveBusnessInformation() {
    this.getBusinessInformation();
    if (
      this.alertBusinessLogo === false &&
      this.bsnessInfoInputStatus.business_email === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.business_name === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.description === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.industry === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.trading_name === 'form-control is-valid'
    ) {
      this.saveBusnessInformation()
      setTimeout(() => {
        this.router.navigate(['create-business/step2'])
      }, 2000);
    }

  }

  saveBusnessInformation() {
    sessionStorage.setItem(businessInformation, JSON.stringify(this.businessInformation))
  }

  getBusinessInformation() {
    this.getDeliBusinessPhone()
    this.businessInformation = {
      business_logo: this.businessLogo,
      trading_name: this.bsnessInfoForm.get('trading_name').value,
      business_name: this.bsnessInfoForm.get('business_name').value,
      description: this.bsnessInfoForm.get('description').value,
      industry: this.bsnessInfoForm.get('industry').value,
      business_email: this.bsnessInfoForm.get('business_email').value,
      business_phone: this.businessPhoneNumber,
      delivery_no: this.deliveryPhoneNumber
    }
    this.processingData(this.businessInformation)
  }

  getDeliBusinessPhone() {
    this.businessPhoneNumber = (<HTMLInputElement>(
      document.getElementById("businessPhoneNumber")
    )).value;
    this.deliveryPhoneNumber = (<HTMLInputElement>(
      document.getElementById("deliveryPhoneNumber")
    )).value;
  }

  processingData(businessInformation) {
    this.bsnessInfoInputStatus.trading_name = businessInformation.trading_name ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.business_name = businessInformation.business_name ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.description = businessInformation.description ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.industry = businessInformation.industry ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.business_email = businessInformation.business_email ? 'form-control is-valid' : 'form-control is-invalid'

    this.business_email = businessInformation.business_email
    if (this.business_email.match(this.emailAdssRegex)) {
      this.bsnessInfoInputStatus.business_email = 'form-control is-valid'
    } else {
      this.bsnessInfoInputStatus.business_email = 'form-control is-invalid'
    }
    if (this.businessLogo) {
      this.alertBusinessLogo = false
    } else {
      this.alertBusinessLogo = true
    }
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
            localizedCountries: { ng: "Nigeria", gh: "Ghana" },
            onlyCountries: ["GH", "NG"],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === "GH" ||
          this.locationData.country_code === "NG"
        ) {
          this.prefixContryCode = this.locationData.country_calling_code;
          this.isValidCountry = false
        } else {
          this.isValidCountry = true;
          this.prefixContryCode = "+233";
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
}
