import { TestBed } from '@angular/core/testing';

import { BreedingService } from './breeding.service';

describe('BreedingService', () => {
  let service: BreedingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
