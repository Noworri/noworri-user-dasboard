import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
export interface PeriodicElement {
  transactionType: string;
  date: string;
  dealingWith: string;
  amount: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
  {
    date: "a month a go",
    transactionType: "Merchandise",
    dealingWith: "+233279414289",
    amount: 1200,
    status: "pending",
  },
];
@Component({
  selector: "vex-transaction-table",
  templateUrl: "./transaction-table.component.html",
  styleUrls: ["./transaction-table.component.scss"],
})
export class TransactionTableComponent implements OnInit {
  displayedColumns: string[] = [
    "Date",
    "transactionType",
    "dealingWith",
    "amount",
    "status",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() {}

  ngOnInit(): void {}
}
