import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';
import { USER_SESSION_KEY } from 'src/app/Models/constants';
import { Router } from '@angular/router';
import { UserSession } from 'src/app/Models/interfaces';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent implements OnInit {

  dropdownOpen: boolean;
  icPerson = icPerson;
  userData: UserSession;
  ppURL: string;

  constructor(private popover: PopoverService,
              private router: Router,
              private cd: ChangeDetectorRef) {
                const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
                if(sessionData) {
                  this.userData = sessionData;
                } else {
                  router.navigate(['/auth/login'])
                }
              }

  ngOnInit() {
    this.ppURL = this.userData.photo ? `https://noworri.com/api/public/uploads/images/pp/${this.userData.photo}` : `https://picsum.photos/200/300`;
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
