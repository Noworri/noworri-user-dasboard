import { Component, Input, OnInit } from "@angular/core";
import { trackByRoute } from "../../utils/track-by";
import { NavigationService } from "../../services/navigation.service";
import icRadioButtonChecked from "@iconify/icons-ic/twotone-radio-button-checked";
import icRadioButtonUnchecked from "@iconify/icons-ic/twotone-radio-button-unchecked";
import { LayoutService } from "../../services/layout.service";
import { ConfigService } from "../../services/config.service";
import { map } from "rxjs/operators";

import icStore from "@iconify/icons-ic/twotone-store";
import { Router } from "@angular/router";
import { BUSINESS_DATA_KEY } from "src/app/Models/constants";
@Component({
  selector: "vex-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(
    map((config) => config.sidenav.title)
  );
  imageUrl$ = this.configService.config$.pipe(
    map((config) => config.sidenav.imageUrl)
  );
  showCollapsePin$ = this.configService.config$.pipe(
    map((config) => config.sidenav.showCollapsePin)
  );

  items = this.navigationService.items;
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;

  icStore = icStore;
  businessDetails: any;
  hasBusiness: boolean;
  businessLogoUrl: any;

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY,);
    this.businessDetails = JSON.parse(businessData)
    this.hasBusiness = !!this.businessDetails;

    this.businessLogoUrl = `https://noworri.com/api/public/uploads/company/business/${this.businessDetails?.business_logo}`
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }
  addBusiness() {
    this.router.navigate(["/dashboards/add-business"]);
  }

  gotToBusiness(){
    console.log('this.businessDetails.legally_registered', this.businessDetails.legally_registered === '0')
    if(this.businessDetails.legally_registered === '0') {
      this.router.navigate(['/dashboards/business-settings'])
    } else if(this.businessDetails.legally_registered === '1' && this.businessDetails.status === 'approved') {
      this.router.navigate(['/dashboards/business-settings'])
    } else {
      this.router.navigate(['/dashboards/activation-pending'])
    }
  }
  // for left profil photo//
}
