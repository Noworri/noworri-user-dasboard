import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseEscrowStep2Component } from './merchandise-escrow-step2.component';

describe('MerchandiseEscrowStep2Component', () => {
  let component: MerchandiseEscrowStep2Component;
  let fixture: ComponentFixture<MerchandiseEscrowStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiseEscrowStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseEscrowStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
