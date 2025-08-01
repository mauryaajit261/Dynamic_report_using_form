import { TestBed } from '@angular/core/testing';

import { Vastuvisit2Service } from './vastuvisit2.service';

describe('Vastuvisit2Service', () => {
  let service: Vastuvisit2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vastuvisit2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
