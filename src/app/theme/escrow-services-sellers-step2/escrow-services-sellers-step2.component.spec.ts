import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServicesSellersStep2Component } from './escrow-services-sellers-step2.component';

describe('EscrowServicesSellersStep2Component', () => {
  let component: EscrowServicesSellersStep2Component;
  let fixture: ComponentFixture<EscrowServicesSellersStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServicesSellersStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServicesSellersStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
