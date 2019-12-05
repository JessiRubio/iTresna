import { TestBed } from '@angular/core/testing';

import { SenalesService } from './senales.service';

describe('SenalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenalesService = TestBed.get(SenalesService);
    expect(service).toBeTruthy();
  });
});
