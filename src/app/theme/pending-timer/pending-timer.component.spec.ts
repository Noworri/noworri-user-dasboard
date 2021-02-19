import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTimerComponent } from './pending-timer.component';

describe('PendingTimerComponent', () => {
  let component: PendingTimerComponent;
  let fixture: ComponentFixture<PendingTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
