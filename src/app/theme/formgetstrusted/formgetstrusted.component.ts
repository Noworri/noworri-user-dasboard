import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from './../../Service/geo-location.service';

@Component({
  selector: 'app-formgetstrusted',
  templateUrl: './formgetstrusted.component.html',
  styleUrls: ['./formgetstrusted.component.scss']
})
export class FormgetstrustedComponent implements OnInit {

  countryData: any;

  locationData: string;

  displayInput: boolean;
  waitingDisplayInput: boolean;

  constructor(private router: Router, private geoLocationService: GeoLocationService) {

  }

  ngOnInit() {
    //----for input style----//

    // ---for contry location -----//
    this.getDataLocation();

  }

  whatsAppInputStyle() {
    document.getElementsByTagName('input')[7].setAttribute('style', ' opacity: 1;width: 470px;border-color:blue; border-radius: 6px;')
  }

  additionalPhoneInputStyle() {
    document.getElementsByTagName('input')[5].setAttribute('style', ' opacity: 1;width: 420px;border-color:blue; border-radius: 6px;border-right-color: initial;')
  }

  businessPhoneNumberInputStyle() {
    document.getElementsByTagName('input')[4].setAttribute('style', ' opacity: 1;width: 470px;border-color:blue; border-radius: 6px;')

  }

  // -----for contry location------//

  getDataLocation() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve(this.locationData = data['country'])
      });
    }).then(() => {
      this.countryData = {
        preferredCountries: [`${this.locationData}`],
        localizedCountries: { ng: 'Nigeria', gh: 'Ghana' },
        onlyCountries: ['GH', 'NG']
      };
    }).then(() => {
      this.waitingDisplayInput = true;
      setTimeout(() => {
        this.whatsAppInputStyle();
        this.additionalPhoneInputStyle();
        this.businessPhoneNumberInputStyle();
      });
    });
  }

  
  continueToIdentityVerication() {
    this.router.navigate(['identityverification']);
  }


}
