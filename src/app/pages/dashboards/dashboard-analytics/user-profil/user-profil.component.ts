import { Component, OnInit } from '@angular/core';
import { USER_SESSION_KEY } from 'src/app/Models/constants';

@Component({
  selector: 'vex-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  hide = true;
  userData: any;
  constructor() {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
  }

  ngOnInit(): void {
  }

}
