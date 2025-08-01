import { TestBed } from '@angular/core/testing';

import { VastuEnergyScanService } from './vastu-energy-scan.service';

describe('VastuEnergyScanService', () => {
  let service: VastuEnergyScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VastuEnergyScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
