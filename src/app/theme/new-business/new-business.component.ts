import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss']
})
export class NewBusinessComponent implements OnInit {

  // for colapse//
  isCollapsed1 :any
  isCollapsed2 :any
  isCollapsed3 :any
  
  colaps1Status='Hide'
  colaps2Status='Hide'
  colaps3Status='Hide'



  myForm: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  }
  // for colapse
  onChangeCollaps1(){
     this.isCollapsed1 = !this.isCollapsed1
     this.colaps1Status=!this.isCollapsed1 ? 'Hide' : 'Show'
    }
     onChangeCollaps2(){
     this.isCollapsed2 = !this.isCollapsed2
     this.colaps2Status=!this.isCollapsed2 ? 'Hide' : 'Show'
    }
    onChangeCollaps3(){
      this.isCollapsed3 = !this.isCollapsed3
      this.colaps3Status=!this.isCollapsed3 ? 'Hide' : 'Show'
     }
    
}
