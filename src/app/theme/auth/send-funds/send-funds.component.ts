import { Component, OnInit } from '@angular/core';
import { countryISO } from '../../../shared/utils/country';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { DeleteComponent } from '../delete/delete.component';
import { Router } from '@angular/router'
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.component.html',
  styleUrls: ['./send-funds.component.scss']
})

export class SendFundsComponent implements OnInit {
  allowedCountries = countryISO;
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

 

  constructor(
    
  ) { }
  public ngOnInit(): void {
    
  }

  
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


  
  


}
