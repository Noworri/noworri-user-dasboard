import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessActivationPendingComponent } from './business-activation-pending.component';

describe('BusinessActivationPendingComponent', () => {
  let component: BusinessActivationPendingComponent;
  let fixture: ComponentFixture<BusinessActivationPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessActivationPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessActivationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
