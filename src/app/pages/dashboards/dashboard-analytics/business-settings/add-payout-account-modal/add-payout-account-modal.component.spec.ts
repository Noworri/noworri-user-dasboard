import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayoutAccountModalComponent } from './add-payout-account-modal.component';

describe('AddPayoutAccountModalComponent', () => {
  let component: AddPayoutAccountModalComponent;
  let fixture: ComponentFixture<AddPayoutAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayoutAccountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayoutAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
