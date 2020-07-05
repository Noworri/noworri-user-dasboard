import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
  returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  unlock() {
    localStorage.setItem("lockScreen", "false");
    this.router.navigate([this.returnUrl]);
  }

}
