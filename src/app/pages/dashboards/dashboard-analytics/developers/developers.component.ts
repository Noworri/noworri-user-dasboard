import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER_SESSION_KEY } from 'src/app/Models/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'vex-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class DevelopersComponent implements OnInit {
  userData: any;
  unsubscribe$ = new Subject();
  businessAccountData: any;
  hide = true;
  constructor(private businessService: BusinessService) {
    this.userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
  }
  
  ngOnInit() {
    this.getBusinessAccountDetails();
  }
  onViewApiDoc() {
    window.open("https://api.noworri.com/docs", "_blank");
  }

  getPlugin(){
    window.open("https://api.noworri.com/api/getplugin", "_blank");

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
