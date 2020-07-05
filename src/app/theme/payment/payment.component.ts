import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  AfficheAddbank:boolean
  AfficheAddvisa:boolean
  AfficheAddmobile:boolean

  constructor() { }

  ngOnInit() {
  }
  AfficheAddBank(){
   this.AfficheAddbank=true
  }
  AfficheAddVisa(){
    this.AfficheAddvisa=true
  }
  AfficheAddMobile(){
   this.AfficheAddmobile=true
  }

}
