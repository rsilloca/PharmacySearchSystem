import { TestBed } from '@angular/core/testing';

import { FarmaciaService } from './farmacia.service';

describe('FarmaciaService', () => {
  let service: FarmaciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmaciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
