import { Injectable } from '@angular/core';
import { MODE_DATA_KEY } from '../Models/constants';


@Injectable({
  providedIn: 'root'
})
export class DashboardModeService {

  hasActivedTestMode: boolean;

  mode = 'Test '
  

  constructor() { }
  activateTestMode(data) {
    if (data.checked === true) {
      this.hasActivedTestMode = true;
      this.mode = 'Live '
    } else {
      this.hasActivedTestMode = false;
      this.mode = 'Test '
    }
    const dashboardModeData = {
      hasActivedTestMode: this.hasActivedTestMode,
      mode: this.mode
    }
    localStorage.setItem(MODE_DATA_KEY, JSON.stringify(dashboardModeData));
    window.location.reload();
  }

}
