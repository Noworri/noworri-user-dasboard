import { Component, OnInit } from "@angular/core";

@Component({
  selector: "vex-business-settings",
  templateUrl: "./business-settings.component.html",
  styleUrls: ["./business-settings.component.scss"],
})
export class BusinessSettingsComponent implements OnInit {
  showModal = false;
  constructor() {}

  ngOnInit(): void {}
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
