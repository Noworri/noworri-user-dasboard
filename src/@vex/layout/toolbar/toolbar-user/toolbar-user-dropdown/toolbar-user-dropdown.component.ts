import { StyleService } from './../../../../services/style.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { MenuItem } from "../interfaces/menu-item.interface";
import { trackById } from "../../../../utils/track-by";
import icPerson from "@iconify/icons-ic/twotone-person";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icMoveToInbox from "@iconify/icons-ic/twotone-move-to-inbox";
import icListAlt from "@iconify/icons-ic/twotone-list-alt";
import icTableChart from "@iconify/icons-ic/twotone-table-chart";
import icCheckCircle from "@iconify/icons-ic/twotone-check-circle";
import icAccessTime from "@iconify/icons-ic/twotone-access-time";
import icDoNotDisturb from "@iconify/icons-ic/twotone-do-not-disturb";
import icOfflineBolt from "@iconify/icons-ic/twotone-offline-bolt";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import icBusiness from "@iconify/icons-ic/twotone-business";
import icVerifiedUser from "@iconify/icons-ic/twotone-verified-user";
import icLock from "@iconify/icons-ic/twotone-lock";
import icNotificationsOff from "@iconify/icons-ic/twotone-notifications-off";
import { Icon } from "@visurel/iconify-angular";
import { PopoverRef } from "../../../../components/popover/popover-ref";
import {
  BUSINESS_DATA_KEY,
  SESSION_STORAGE_KEY,
  USER_SESSION_KEY,
} from "src/app/Models/constants";
import { BUSINESS_INFO_KEY } from "src/app/pages/dashboards/dashboard-analytics/add-business/add-business.component";



export enum Style {
  light = 'vex-style-light',
  default = 'vex-style-default',
  dark = 'vex-style-dark'
}

export interface OnlineStatus {
  id: "online" | "away" | "dnd" | "offline";
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: "vex-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserDropdownComponent implements OnInit {
  userData: any;
  items: MenuItem[] = [
    {
      id: "1",
      icon: icAccountCircle,
      label: "My Profile",
      description: "Personal Information",
      colorClass: "text-teal",
      route: "/dashboards/user-profil",
    },
    {
      id: "2",
      icon: icMoveToInbox,
      label: "Business settings",
      description: "Business profil & payout account",
      colorClass: "text-primary",
      route: "/dashboards/business-settings",
    },
    // {
    //   id: '3',
    //   icon: icListAlt,
    //   label: 'My Projects',
    //   description: 'Tasks & Active Projects',
    //   colorClass: 'text-amber',
    //   route: '/apps/scrumboard'
    // },
    // {
    //   id: '4',
    //   icon: icTableChart,
    //   label: 'Billing Information',
    //   description: 'Pricing & Current Plan',
    //   colorClass: 'text-purple',
    //   route: '/pages/pricing'
    // }
  ];

  statuses: OnlineStatus[] = [
    {
      id: "online",
      label: "Online",
      icon: icCheckCircle,
      colorClass: "text-green",
    },
    {
      id: "away",
      label: "Away",
      icon: icAccessTime,
      colorClass: "text-orange",
    },
    {
      id: "dnd",
      label: "Do not disturb",
      icon: icDoNotDisturb,
      colorClass: "text-red",
    },
    {
      id: "offline",
      label: "Offline",
      icon: icOfflineBolt,
      colorClass: "text-gray",
    },
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;

  constructor(
    private cd: ChangeDetectorRef,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
    private styleService: StyleService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
  }

  ngOnInit() { }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem(USER_SESSION_KEY);
    localStorage.removeItem(BUSINESS_DATA_KEY);
    localStorage.removeItem(BUSINESS_INFO_KEY);
    localStorage.clear();
    this.popoverRef.close();
  }


  colorSwichMode(data) {
    if (data.checked === true) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }



  enableDarkMode() {
    this.styleService.setStyle(Style.dark);
  }

  disableDarkMode() {
    this.styleService.setStyle(Style.default);
  }
}
