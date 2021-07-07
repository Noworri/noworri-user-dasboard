import { Injectable } from '@angular/core';
import { MODE_DATA_KEY } from '../Models/constants';


@Injectable({
  providedIn: 'root'
})
export class DashboardModeService {

  hasActivedTestMode: boolean;

  mode = 'Live '
  

  constructor() { }
  activateTestMode(data) {
    if (data.checked === true) {
      this.hasActivedTestMode = true;
      this.mode = 'Test '
    } else {
      this.hasActivedTestMode = false;
      this.mode = 'Live '
    }
    const dashboardModeData = {
      hasActivedTestMode: this.hasActivedTestMode,
      mode: this.mode
    }
    localStorage.setItem(MODE_DATA_KEY, JSON.stringify(dashboardModeData));
    window.location.reload();
  }

}
