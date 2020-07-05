import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowStep2Component } from './escrow-step2.component';

describe('EscrowStep2Component', () => {
  let component: EscrowStep2Component;
  let fixture: ComponentFixture<EscrowStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
