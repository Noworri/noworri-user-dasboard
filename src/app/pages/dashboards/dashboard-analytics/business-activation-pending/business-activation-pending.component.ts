import { Component, OnInit } from '@angular/core';
import { BUSINESS_DATA_KEY, USER_SESSION_KEY } from 'src/app/Models/constants';

@Component({
  selector: 'vex-business-activation-pending',
  templateUrl: './business-activation-pending.component.html',
  styleUrls: ['./business-activation-pending.component.scss']
})
export class BusinessActivationPendingComponent implements OnInit {
  userBusinessData: any;
  userData: any;
  userId: string;
  countDownStop: any;

  constructor() {
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    this.userId = sessionData.user_uid;
  }

  ngOnInit(): void {
    if(this.userBusinessData.status === "pending") {
      const businessCountDownEnd = new Date(this.userBusinessData.updated_at);
      businessCountDownEnd.setHours(
        businessCountDownEnd.getHours() + 24
      );
      this.countDownStop =  businessCountDownEnd.getTime()/1000;
    }
  }

}
