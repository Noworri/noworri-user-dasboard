import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transation-table',
  templateUrl: './transation-table.component.html',
  styleUrls: ['./transation-table.component.scss']
})
export class TransationTableComponent implements OnInit {

  dateIput: Boolean;

  constructor() { }

  ngOnInit() {
  }


  onActivateDateInput() {
    this.dateIput = !this.dateIput
  }

}
