import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerServicesContratComponent } from './seller-services-contrat.component';

describe('SellerServicesContratComponent', () => {
  let component: SellerServicesContratComponent;
  let fixture: ComponentFixture<SellerServicesContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerServicesContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerServicesContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
