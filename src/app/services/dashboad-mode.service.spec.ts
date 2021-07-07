import { TestBed } from '@angular/core/testing';

import { DashboardModeService } from './dashboard-mode.service';

describe('TestModService', () => {
  let service: DashboardModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
