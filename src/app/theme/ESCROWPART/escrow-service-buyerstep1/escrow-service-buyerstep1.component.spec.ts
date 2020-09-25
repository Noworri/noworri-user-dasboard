import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServiceBuyerstep1Component } from './escrow-service-buyerstep1.component';

describe('EscrowServiceBuyerstep1Component', () => {
  let component: EscrowServiceBuyerstep1Component;
  let fixture: ComponentFixture<EscrowServiceBuyerstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServiceBuyerstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServiceBuyerstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
