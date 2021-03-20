import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/services/transactions.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import {
  SESSION_STORAGE_KEY,
  TRANSACTION_SOURCE,
  USER_SESSION_KEY,
} from "src/app/Models/constants";

export interface TransactionsData {
  transactionType: string;
  date: string;
  dealingWith: string;
  amount: number;
  status: string;
}

const ELEMENT_DATA: TransactionsData[] = [
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
export class TransactionTableComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  layoutCtrl = new FormControl("boxed");
  searchCtrl = new FormControl();

  transactionType: string;
  transactionsData: any;
  userId: string;
  amount: any;
  hasNoTransactions: boolean;
  userPhone: string;
  userRole: string;

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

  labels = this.displayedColumns;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private transactionsService: TransactionsService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userId = sessionData.user_uid;
    this.userPhone = sessionData.mobile_phone;
  }

  ngOnInit(): void {
    this.loadTransactions(this.userId);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // toggleColumnVisibility(column, event) {
  //   event.stopPropagation();
  //   event.stopImmediatePropagation();
  // column.visible = !column.visible;
  // }

  loadTransactions(userId: string) {
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.transactionsService
      .getUserTransactions(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.transactionsData = transactions.map((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            details.destinator_role =
              details.initiator_role === "buy" ? "sell" : "buy";
            if (
              details.initiator_role === "sell" &&
              this.userId === details.initiator_id
            ) {
              details["sellerPhone"] = details.initiator_phone;
              details["buyerPhone"] = details.destinator_phone;
            } else if (
              details.initiator_role === "buy" &&
              this.userId === details.initiator_id
            ) {
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            } else if (
              details.destinator_role === "buy" &&
              this.userId === details.destinator_id
            ) {
              details["sellerPhone"] = details.initiator_phone;
              details["buyerPhone"] = details.destinator_phone;
            } else if (
              details.destinator_role === "sell" &&
              this.userId === details.destinator_id
            ) {
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            } else {
              details["sellerPhone"] = details.destinator_phone;
              details["buyerPhone"] = details.initiator_phone;
            }
            this.amount = details.total_price;
            return details;
          });
          const filteredDetails = this.transactionsData.filter(detail => detail.transaction_source === TRANSACTION_SOURCE.BUSINESS)

          this.hasNoTransactions = transactions.length === 0 ? true : false;
          this.dataSource = new MatTableDataSource(filteredDetails);
        },
        (error) => console.log(error.message)
      );
  }

  processDateData() {}

  onViewTransactionDetails(
    transactionKey,
    userRole,
    ownerRole,
    userPhone,
    ownerPhone,
    transactionType
  ) {
    transactionType = transactionType.toLowerCase();

    if (this.userPhone === userPhone) {
      this.userRole = userRole;
    } else if (this.userPhone === ownerPhone) {
      this.userRole = ownerRole;
    }
    console.log("userRole", this.userRole);
    console.log("transactionKey", transactionKey);

    if (this.userRole === "buy" && transactionType === "merchandise") {
      this.router.navigate([`buyermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === "sell" && transactionType === "merchandise") {
      this.router.navigate([`sellermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === "buy" && transactionType === "services") {
      this.router.navigate([`buyerservicescontrat/${transactionKey}`]);
    } else if (this.userRole === "sell" && transactionType === "services") {
      this.router.navigate([`sellerservicescontrat/${transactionKey}`]);
    }
  }
}
