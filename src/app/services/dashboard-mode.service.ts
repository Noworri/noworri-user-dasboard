import { Injectable } from '@angular/core';
import { MODE_DATA_KEY } from '../Models/constants';


@Injectable({
  providedIn: 'root'
})
export class DashboardModeService {

  isLiveModeActive: boolean = true;
  mode = 'Live '
  
  constructor() { }
  activateTestMode(data) {
    if (data.checked === true) {
      this.isLiveModeActive = true;
      this.mode = 'Live '
    } else {
      this.isLiveModeActive = false;
      this.mode = 'Test '
    }
    const dashboardModeData = {
      isLiveModeActive: this.isLiveModeActive,
      mode: this.mode
    }
    localStorage.setItem(MODE_DATA_KEY, JSON.stringify(dashboardModeData));
    window.location.reload();
  }

}
