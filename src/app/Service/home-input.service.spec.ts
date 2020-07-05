import { TestBed } from '@angular/core/testing';

import { HomeInputService } from './home-input.service';

describe('HomeInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeInputService = TestBed.get(HomeInputService);
    expect(service).toBeTruthy();
  });
});
