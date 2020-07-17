import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerServicesContratComponent } from './buyer-services-contrat.component';

describe('BuyerServicesContratComponent', () => {
  let component: BuyerServicesContratComponent;
  let fixture: ComponentFixture<BuyerServicesContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerServicesContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerServicesContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
