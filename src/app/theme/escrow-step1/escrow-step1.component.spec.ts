import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowStep1Component } from './escrow-step1.component';

describe('EscrowStep1Component', () => {
  let component: EscrowStep1Component;
  let fixture: ComponentFixture<EscrowStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
