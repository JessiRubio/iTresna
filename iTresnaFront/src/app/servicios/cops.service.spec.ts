import { TestBed } from '@angular/core/testing';

import { CopsService } from './cops.service';

describe('CopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopsService = TestBed.get(CopsService);
    expect(service).toBeTruthy();
  });
});
