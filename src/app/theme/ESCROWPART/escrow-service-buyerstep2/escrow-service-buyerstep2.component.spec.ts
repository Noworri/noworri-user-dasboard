import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServiceBuyerstep2Component } from './escrow-service-buyerstep2.component';

describe('EscrowServiceBuyerstep2Component', () => {
  let component: EscrowServiceBuyerstep2Component;
  let fixture: ComponentFixture<EscrowServiceBuyerstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServiceBuyerstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServiceBuyerstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
