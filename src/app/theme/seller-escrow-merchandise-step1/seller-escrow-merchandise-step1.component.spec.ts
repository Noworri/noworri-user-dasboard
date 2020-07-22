import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEscrowMerchandiseStep1Component } from './seller-escrow-merchandise-step1.component';

describe('SellerEscrowMerchandiseStep1Component', () => {
  let component: SellerEscrowMerchandiseStep1Component;
  let fixture: ComponentFixture<SellerEscrowMerchandiseStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEscrowMerchandiseStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEscrowMerchandiseStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
