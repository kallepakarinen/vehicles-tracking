import {Injectable} from '@angular/core';
import {VehicleHttpService} from './vehicle-http.service';
import {Vehicle} from '../Vehicle';
import {Observable} from 'rxjs/internal/Observable';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private vehicleHttpService: VehicleHttpService, private localStorageService: LocalStorageService) {
  }

  getVehicles() {
    return this.localStorageService.loadVehicles();
  }


  getVehicleById(vehicleId: number) {
    return this.localStorageService.getVehicleById(vehicleId);
  }

  createVehicle(vehicle) {
    return this.localStorageService.saveVehicle(vehicle);
  }
}
