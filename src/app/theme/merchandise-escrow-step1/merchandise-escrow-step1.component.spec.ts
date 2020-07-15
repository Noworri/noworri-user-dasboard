import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseEscrowStep1Component } from './merchandise-escrow-step1.component';

describe('MerchandiseEscrowStep1Component', () => {
  let component: MerchandiseEscrowStep1Component;
  let fixture: ComponentFixture<MerchandiseEscrowStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiseEscrowStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseEscrowStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
