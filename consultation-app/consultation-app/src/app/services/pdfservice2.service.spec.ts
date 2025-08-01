import { TestBed } from '@angular/core/testing';

import { Pdfservice2Service } from './pdfservice2.service';

describe('Pdfservice2Service', () => {
  let service: Pdfservice2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pdfservice2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
