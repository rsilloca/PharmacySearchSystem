import { TestBed } from '@angular/core/testing';

import { PharmacyGuard } from './pharmacy.guard';

describe('PharmacyGuard', () => {
  let guard: PharmacyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PharmacyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
