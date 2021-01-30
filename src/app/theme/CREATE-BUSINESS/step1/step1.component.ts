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

  constructor(private formBuilder: FormBuilder, private router: Router, private createBusines: CreateBusinessService) { }

  ngOnInit() {
    this.businessFormInit()
  }
  businessFormInit() {
    this.bsnessInfoForm = this.formBuilder.group({
      business_logo: '',
      trading_name: '',
      business_name: '',
      description: '',
      industry: '',
      business_email: '',
      business_phone: '',
      delivery_no: ''
    })
  }

  onSaveBusnessInformation() {
    this.getBusinessInformation();
    if (
      this.bsnessInfoInputStatus.business_email === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.business_name === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.business_phone === 'form-control is-valid' &&
      this.bsnessInfoInputStatus.delivery_no === 'form-control is-valid' &&
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
    this.businessInformation = {
      business_logo: '',
      trading_name: this.bsnessInfoForm.get('trading_name').value,
      business_name: this.bsnessInfoForm.get('business_name').value,
      description: this.bsnessInfoForm.get('description').value,
      industry: this.bsnessInfoForm.get('industry').value,
      business_email: this.bsnessInfoForm.get('business_email').value,
      business_phone: this.bsnessInfoForm.get('business_phone').value,
      delivery_no: this.bsnessInfoForm.get('delivery_no').value
    }
    this.processingData(this.businessInformation)
  }

  processingData(businessInformation) {
    this.bsnessInfoInputStatus.trading_name = businessInformation.trading_name ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.business_name = businessInformation.business_name ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.description = businessInformation.description ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.industry = businessInformation.industry ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.business_email = businessInformation.business_email ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.business_phone = businessInformation.business_phone ? 'form-control is-valid' : 'form-control is-invalid'
    this.bsnessInfoInputStatus.delivery_no = businessInformation.delivery_no ? 'form-control is-valid' : 'form-control is-invalid'
    this.business_email = businessInformation.business_email
    if (this.business_email.match(this.emailAdssRegex)) {
      this.bsnessInfoInputStatus.business_email = 'form-control is-valid'
    } else {
      this.bsnessInfoInputStatus.business_email = 'form-control is-invalid'
    }
  }

}
