/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DisputeDataService } from './dispute-data.service';

describe('Service: DisputeData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisputeDataService]
    });
  });

  it('should ...', inject([DisputeDataService], (service: DisputeDataService) => {
    expect(service).toBeTruthy();
  }));
});
