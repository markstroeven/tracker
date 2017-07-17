import { TestBed, inject } from '@angular/core/testing';

import { PcsService } from './pcs.service';

describe('PcsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcsService]
    });
  });

  it('should be created', inject([PcsService], (service: PcsService) => {
    expect(service).toBeTruthy();
  }));
});
