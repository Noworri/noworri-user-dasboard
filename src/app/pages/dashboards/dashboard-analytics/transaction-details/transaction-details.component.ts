import { Component, OnInit } from "@angular/core";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMap from "@iconify/icons-ic/twotone-map";
import { IconModule } from "@visurel/iconify-angular";
@Component({
  selector: "vex-transaction-details",
  templateUrl: "./transaction-details.component.html",
  styleUrls: ["./transaction-details.component.scss"],
})
export class TransactionDetailsComponent implements OnInit {
  icPhone = icPhone;
  icMap = icMap;

  constructor() {}

  ngOnInit(): void {}
}
