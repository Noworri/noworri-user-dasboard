import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TestModService {

  hasActivedTestMode:boolean;

  constructor() { }

  activateTestMode(data){
    if(data.checked === true){
      this.hasActivedTestMode=true;
    }else{
      this.hasActivedTestMode=false;
    }
  
  }

}
