import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-merchandise-escrow-step2',
  templateUrl: './merchandise-escrow-step2.component.html',
  styleUrls: ['./merchandise-escrow-step2.component.scss']
})
export class MerchandiseEscrowStep2Component implements OnInit {

  CreditCard:boolean
  Mobilewalet:boolean
  Form:FormGroup

  constructor( private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.InitCreditOrWallet()
  }



  InitCreditOrWallet(){
    this.Form=this.formbuilder.group({
      creditCardValue:''
    })
    var RadioValue= this.Form.get('creditCardValue').value
    if(RadioValue==''){
      this.Mobilewalet=true
    }
  }


  DisplayCardOrWallet(){
    var RadioValue= this.Form.get('creditCardValue').value
    if(RadioValue=='creditCard'){
      this.CreditCard=true
      this.Mobilewalet=false
    }else if(RadioValue=='MobileWallet'){
       this.Mobilewalet=true
       this.CreditCard=false
    }
  }

}
