import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-merchandise-escrow-step1",
  templateUrl: "./merchandise-escrow-step1.component.html",
  styleUrls: ["./merchandise-escrow-step1.component.scss"],
})
export class MerchandiseEscrowStep1Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  RoutToStep2() {
    this.router.navigate(["/escrowmerchandisestep2"]);
  }
}
