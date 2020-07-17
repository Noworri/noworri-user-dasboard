import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-services-contrat',
  templateUrl: './seller-services-contrat.component.html',
  styleUrls: ['./seller-services-contrat.component.scss']
})
export class SellerServicesContratComponent implements OnInit {
  isCollapsed = false;
  message1:string='Hide'
  message2: string = 'keyboard_arrow_down';
  message3:string='Hide'
  message4: string = 'keyboard_arrow_down';

  ShowOrNotOpenNoteInput:boolean
  constructor() { }

  ngOnInit() {
  }

  collapses(): void {
    this.message2 = 'keyboard_arrow_down';
    this.message1='Show'
  }
 
  expanded(): void {
    this.message2= 'keyboard_arrow_up';
    this.message1='Hide'
  }
  collapsess(): void {
    this.message3='Show'
    this.message4='keyboard_arrow_down'
  }
  expandeds(): void {
    this.message3='Hide'
    this.message4='keyboard_arrow_up'
  }

  
  OpenNoteInput(){
    this.ShowOrNotOpenNoteInput=true
  }

}
