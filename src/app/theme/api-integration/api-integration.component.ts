import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BusinessService } from "src/app/Service/business.service";
import { SESSION_STORAGE_KEY } from "src/app/shared/constants";

@Component({
  selector: "app-api-integration",
  templateUrl: "./api-integration.component.html",
  styleUrls: ["./api-integration.component.scss"],
})
export class ApiIntegrationComponent implements OnInit {
  userData: any;
  unsubscribe$ = new Subject();
  businessAccountData: any;
  hide = true;
  constructor(private businessService: BusinessService) {
    this.userData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
  }

  ngOnInit() {
    this.getBusinessAccountDetails();
  }
  onViewApiDoc() {
    window.open("https://api.noworri.com/docs", "_blank");
  }

  getBusinessAccountDetails() {
    this.businessService
      .getBusinessDetails(this.userData.user_uid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((businessData: any) => {
        if (businessData.status !== 404) {
          this.businessAccountData = businessData;
        }
        return businessData;
      });
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }
}
