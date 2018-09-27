import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../Vehicle';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute) {
    this.vehicles = [];
  }

  ngOnInit() {

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.filter(i => i.active === true);
    });
  }

  onVehicleSelect(vehicle) {
    this.router.navigate(['/payments', vehicle.id]);
  }
}
