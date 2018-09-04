import { TestBed, inject } from '@angular/core/testing';

import { PaymentHttpService } from './payment-http.service';

describe('PaymentHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentHttpService]
    });
  });

  it('should be created', inject([PaymentHttpService], (service: PaymentHttpService) => {
    expect(service).toBeTruthy();
  }));
});
