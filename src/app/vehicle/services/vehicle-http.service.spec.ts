import { TestBed, inject } from '@angular/core/testing';

import { VehicleHttpService } from './vehicle-http.service';

describe('VehicleHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleHttpService]
    });
  });

  it('should be created', inject([VehicleHttpService], (service: VehicleHttpService) => {
    expect(service).toBeTruthy();
  }));
});
