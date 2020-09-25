import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowMerchandiseSellerstep1Component } from './escrow-merchandise-sellerstep1.component';

describe('EscrowMerchandiseSellerstep1Component', () => {
  let component: EscrowMerchandiseSellerstep1Component;
  let fixture: ComponentFixture<EscrowMerchandiseSellerstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowMerchandiseSellerstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowMerchandiseSellerstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
