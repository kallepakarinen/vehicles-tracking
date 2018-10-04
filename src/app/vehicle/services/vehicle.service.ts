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

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicleHttpService.getVehicles();
  }


  getVehicleById(id): Observable<Vehicle> {
    return this.vehicleHttpService.getById(id);
  }


  createVehicle(vehicle): Observable<Vehicle> {
    console.log(vehicle);
    return this.vehicleHttpService.post(vehicle);
  }

  updateVehicle(vehicle): Observable<Vehicle> {
    console.log('service');
    console.log(vehicle);
    return this.vehicleHttpService.put(vehicle);
  }
}
