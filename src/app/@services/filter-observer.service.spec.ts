import { TestBed } from '@angular/core/testing';

import { FilterObserverService } from './filter-observer.service';

describe('FilterObserverService', () => {
  let service: FilterObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
