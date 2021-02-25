import { Component, OnDestroy, OnInit } from "@angular/core";
import { CountdownTimer } from "ngx-countdown";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BusinessService } from "src/app/Service/business.service";
@Component({
  selector: "app-pending-timer",
  templateUrl: "./pending-timer.component.html",
  styleUrls: ["./pending-timer.component.scss"],
})
export class PendingTimerComponent implements OnInit, OnDestroy {
  countDownEnd: number;
  countDownStart: number;
  userData: any;
  unsubscribe$ = new Subject();
  businessAccountData: any;
  isApproved = false;

  constructor(private businessService: BusinessService) {
    this.userData = JSON.parse(localStorage.getItem("noworri-user-session"));
  }

  ngOnInit() {
    this.getBusinessAccountDetails();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBusinessAccountDetails() {
    this.businessService
      .getBusinessDetails(this.userData.user_uid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((businessData: any) => {
        if (businessData.status !== 404) {
          this.businessAccountData = businessData;
          const startDate = new Date(businessData.created_at);
          this.countDownEnd = startDate.setHours(startDate.getHours() + 24);
          if (businessData.status === "approved") {
            this.isApproved = true;
          }
        }
        return businessData;
      });
  }
}
