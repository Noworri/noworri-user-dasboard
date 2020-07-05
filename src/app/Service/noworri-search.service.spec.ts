/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoworriSearchService } from './noworri-search.service';

describe('Service: NoworriSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoworriSearchService]
    });
  });

  it('should ...', inject([NoworriSearchService], (service: NoworriSearchService) => {
    expect(service).toBeTruthy();
  }));
});
