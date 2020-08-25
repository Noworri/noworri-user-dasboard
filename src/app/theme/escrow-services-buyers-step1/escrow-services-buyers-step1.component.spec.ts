import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServicesBuyersStep1Component } from './escrow-services-buyers-step1.component';

describe('EscrowServicesBuyersStep1Component', () => {
  let component: EscrowServicesBuyersStep1Component;
  let fixture: ComponentFixture<EscrowServicesBuyersStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServicesBuyersStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServicesBuyersStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
