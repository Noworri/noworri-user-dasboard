import { TestBed } from '@angular/core/testing';

import { CreateBusinessService } from './create-business.service';

describe('CreateBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateBusinessService = TestBed.get(CreateBusinessService);
    expect(service).toBeTruthy();
  });
});
