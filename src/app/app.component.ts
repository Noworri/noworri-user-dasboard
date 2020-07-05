import { AngularFirestore } from '@angular/fire/firestore';
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as firebase from 'firebase'

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  

  constructor(private router: Router) { 
    
    var firebaseConfig = {
      apiKey: "AIzaSyC3Cecq8IgWUrEkyExFxodtGFfuO9L9DmQ",
      authDomain: "noworri-68a5b.firebaseapp.com",
      databaseURL: "https://noworri-68a5b.firebaseio.com",
      projectId: "noworri-68a5b",
      storageBucket: "noworri-68a5b.appspot.com",
      messagingSenderId: "257724171600",
      appId: "1:257724171600:web:d30e0841d7d56702a95855",
      measurementId: "G-8KMPML1P4R"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
 
}
