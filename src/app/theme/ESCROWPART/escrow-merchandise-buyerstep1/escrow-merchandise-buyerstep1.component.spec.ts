import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowMerchandiseBuyerstep1Component } from './escrow-merchandise-buyerstep1.component';

describe('EscrowMerchandiseBuyerstep1Component', () => {
  let component: EscrowMerchandiseBuyerstep1Component;
  let fixture: ComponentFixture<EscrowMerchandiseBuyerstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowMerchandiseBuyerstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowMerchandiseBuyerstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
