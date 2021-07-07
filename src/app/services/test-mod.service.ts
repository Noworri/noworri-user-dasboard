import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TestModService {

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
  }

}
