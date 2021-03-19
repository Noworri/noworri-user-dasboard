import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
export interface PeriodicElement {
  transactionId: number;
  channel: string;
  amount: number;
  status: string;
  payoutOn: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    transactionId: 123456443564,
    channel: "Bank account",
    amount: 1200,
    status: "sucess",
    payoutOn: "12/44/2022",
  },
];
@Component({
  selector: "vex-payouts",
  templateUrl: "./payouts.component.html",
  styleUrls: ["./payouts.component.scss"],
})
export class PayoutsComponent implements OnInit {
  displayedColumns: string[] = [
    "transactionId",
    "channel",
    "amount",
    "status",
    "payoutOn",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() {}

  ngOnInit(): void {}
}
