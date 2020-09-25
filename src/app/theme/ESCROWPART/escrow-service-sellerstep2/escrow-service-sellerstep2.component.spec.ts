import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServiceSellerstep2Component } from './escrow-service-sellerstep2.component';

describe('EscrowServiceSellerstep2Component', () => {
  let component: EscrowServiceSellerstep2Component;
  let fixture: ComponentFixture<EscrowServiceSellerstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServiceSellerstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServiceSellerstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
