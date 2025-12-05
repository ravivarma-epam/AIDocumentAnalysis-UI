import { TestBed } from '@angular/core/testing';

import { AidaService } from './aida-service';

describe('AidaService', () => {
  let service: AidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
