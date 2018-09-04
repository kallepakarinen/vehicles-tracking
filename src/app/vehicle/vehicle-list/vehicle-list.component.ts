import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../Vehicle';
import {VehicleService} from '../services/vehicle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService, private router: Router) {
    this.vehicles = [];
  }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicles = this.vehicleService.getVehicles();
  }

  onVehicleSelect(vehicle) {
    this.router.navigate(['/vehicles', vehicle.id]);
  }
}
