import { TestBed } from '@angular/core/testing';

import { Escrowstep1Service } from './escrowstep1.service';

describe('Escrowstep1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Escrowstep1Service = TestBed.get(Escrowstep1Service);
    expect(service).toBeTruthy();
  });
});
