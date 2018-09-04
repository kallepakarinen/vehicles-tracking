import { TestBed, inject } from '@angular/core/testing';

import { PayHttpService } from './pay-http.service';

describe('PayHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayHttpService]
    });
  });

  it('should be created', inject([PayHttpService], (service: PayHttpService) => {
    expect(service).toBeTruthy();
  }));
});
