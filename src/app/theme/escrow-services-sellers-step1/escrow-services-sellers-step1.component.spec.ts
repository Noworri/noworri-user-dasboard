import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowServicesSellersStep1Component } from './escrow-services-sellers-step1.component';

describe('EscrowServicesSellersStep1Component', () => {
  let component: EscrowServicesSellersStep1Component;
  let fixture: ComponentFixture<EscrowServicesSellersStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowServicesSellersStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowServicesSellersStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
