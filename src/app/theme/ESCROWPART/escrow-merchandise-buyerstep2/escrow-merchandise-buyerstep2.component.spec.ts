import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowMerchandiseBuyerstep2Component } from './escrow-merchandise-buyerstep2.component';

describe('EscrowMerchandiseBuyerstep2Component', () => {
  let component: EscrowMerchandiseBuyerstep2Component;
  let fixture: ComponentFixture<EscrowMerchandiseBuyerstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowMerchandiseBuyerstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowMerchandiseBuyerstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
