import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisputeReference } from 'src/app/Service/reference-data.interface';
import { DisputeDataService } from 'src/app/Service/dispute-data.service';

@Component({
  selector: 'app-disput-page',
  templateUrl: './disput-page.component.html',
  styleUrls: ['./disput-page.component.scss'],
})
export class DisputPageComponent implements OnInit {
  form: FormGroup;
  isFormSubmitted = false;
  businessname: string;

  constructor(
    private dataService: DisputeDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.businessname = this.route.snapshot.paramMap.get('business');
    this.setupForm();
  }
  //---------------------Sending dispute and informations-------------------//
  onCreateDispute() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      const data = this.form.value;
      this.dataService.openDistpute(data).subscribe(
        (response) => {
          this.isFormSubmitted = true;
          this.router.navigate(['']);
        },
        (error) => {
          console.log('Error %j', error);
        }
      );
    }
  }
  //------------FormInit----------------//
  setupForm() {
    this.form = this.fb.group({
      email: '',
      phone_no: '',
      title: '',
      details: '',
      proofs: '',
    });
  }
  //------------------routing out to searchPage---------------//
  RoutingOutToSearchPage() {
    this.router.navigate(['']);
  }
}
