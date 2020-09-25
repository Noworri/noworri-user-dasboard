import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServiceSellerstep1Component } from './escrow-service-sellerstep1.component';

describe('EscrowServiceSellerstep1Component', () => {
  let component: EscrowServiceSellerstep1Component;
  let fixture: ComponentFixture<EscrowServiceSellerstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServiceSellerstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServiceSellerstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
