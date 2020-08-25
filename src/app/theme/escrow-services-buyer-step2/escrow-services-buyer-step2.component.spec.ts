import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServicesBuyerStep2Component } from './escrow-services-buyer-step2.component';

describe('EscrowServicesBuyerStep2Component', () => {
  let component: EscrowServicesBuyerStep2Component;
  let fixture: ComponentFixture<EscrowServicesBuyerStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServicesBuyerStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServicesBuyerStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
