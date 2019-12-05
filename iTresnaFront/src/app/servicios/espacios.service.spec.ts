import { TestBed } from '@angular/core/testing';

import { EspaciosService } from './espacios.service';

describe('EspaciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspaciosService = TestBed.get(EspaciosService);
    expect(service).toBeTruthy();
  });
});
