import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  AfficheAddbank: boolean;
  AfficheAddvisa: boolean;
  AfficheAddmobile: boolean;

  CloseAddbank: boolean;

  constructor() {}

  ngOnInit() {}
  DisplayAddBank() {
    this.AfficheAddbank = true;
  }
  DisplayAddVisa() {
    this.AfficheAddvisa = true;
  }
  DisplayAddMobile() {
    this.AfficheAddmobile = true;
  }

  HideAddBank() {
   this.AfficheAddbank=false
  }
  HideAddVisa(){
   this.AfficheAddvisa=false
  }
  HideAddMobile(){
    this.AfficheAddmobile=false

  }
}
