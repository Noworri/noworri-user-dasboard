import { TestBed } from '@angular/core/testing';

import { TestModService } from './test-mod.service';

describe('TestModService', () => {
  let service: TestModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
