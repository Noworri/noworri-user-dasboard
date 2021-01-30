import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

const businessAdressInformation = "businessAdressInfo";
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})


export class Step2Component implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }
  bsnessAdressForm: FormGroup;
  businessInformation: Object;
  bsnessAdressInputStatus = {
    country: '',
    region: '',
    city: '',
    streetAddress: ''
  }

  ngOnInit() {
    this.businessAdressFormInit()
  }
  businessAdressFormInit() {
    this.bsnessAdressForm = this.formBuilder.group({
      country: '',
      region: '',
      city: '',
      streetAddress: ''
    })
  }



  onSaveBusnessInformation() {
    this.getBusinessAdressInformation()
    console.log(this.businessInformation)
    if (
      this.bsnessAdressInputStatus.country === 'form-control is-valid' &&
      this.bsnessAdressInputStatus.region === 'form-control is-valid' &&
      this.bsnessAdressInputStatus.city === 'form-control is-valid' &&
      this.bsnessAdressInputStatus.streetAddress === 'form-control is-valid'
    ) {
      this.saveBusnessAdrssInformation()
      setTimeout(() => {
        this.router.navigate(['create-business/step3'])
      }, 2000);
    }
  }


  saveBusnessAdrssInformation() {
    sessionStorage.setItem(businessAdressInformation, JSON.stringify(this.businessInformation))
  }

  getBusinessAdressInformation() {
    this.businessInformation = {
      country: this.bsnessAdressForm.get('country').value,
      region: this.bsnessAdressForm.get('region').value,
      city: this.bsnessAdressForm.get('city').value,
      streetAddress: this.bsnessAdressForm.get('streetAddress').value,
    }
    this.processingData(this.businessInformation)
  }


  processingData(businessAdressInformation) {
    this.bsnessAdressInputStatus.country = businessAdressInformation.country ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessAdressInputStatus.region = businessAdressInformation.region ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessAdressInputStatus.city = businessAdressInformation.city ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessAdressInputStatus.streetAddress = businessAdressInformation.streetAddress ? 'form-control is-valid' : 'form-control is-invalid'
  }


}
