import { TestBed } from '@angular/core/testing';

import { GenerateHeadersService } from './generate-headers.service';

describe('GenerateHeadersService', () => {
  let service: GenerateHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
