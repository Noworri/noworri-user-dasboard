import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowMerchandiseSellerstep2Component } from './escrow-merchandise-sellerstep2.component';

describe('EscrowMerchandiseSellerstep2Component', () => {
  let component: EscrowMerchandiseSellerstep2Component;
  let fixture: ComponentFixture<EscrowMerchandiseSellerstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowMerchandiseSellerstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowMerchandiseSellerstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
