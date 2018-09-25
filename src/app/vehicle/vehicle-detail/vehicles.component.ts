import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Vehicle} from '../Vehicle';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolbarService} from '../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../ui/toolbar/toolbar-options';
import {MatSnackBar} from '@angular/material';
import {NotificationSnackbarComponent} from '../notifications/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicle: Vehicle;
  vehicles: Vehicle[];
  vehicleId: any;
  editingEnabled: boolean;

  constructor(@Inject(LOCALE_ID) private locale: string, private vehicleService: VehicleService,
              private router: Router, private route: ActivatedRoute,
              private toolbar: ToolbarService, public snackBar: MatSnackBar) {
    this.vehicle = new Vehicle();
    this.vehicles = [];
    this.editingEnabled = false;
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Lisää ajoneuvo', []));
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response;
    });

    if (this.vehicleId !== null) {
      this.editingEnabled = true;
      this.vehicleService.getVehicleById(this.vehicleId).subscribe(response => {
        this.vehicle = response;
      });
    }
  }

  onVehicleSave(): void {
    this.vehicleService.createVehicle(this.vehicle).subscribe(response => {
      this.router.navigate(['/vehicles/']);
    });
    this.openSnackBar();

  }

  OnVehicleUpdate(vehicle): void {
   this.vehicleService.updateVehicle(vehicle).subscribe(response => {
     vehicle = response;
     this.router.navigate(['/vehicles/new']);
   });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      data: 'Ajoneuvo on lisätty',
      duration: 2000,
    });
  }

  onVehicleSelect(vehicle) {
    this.router.navigate(['/vehicles/' + vehicle.id]);
   // this.ngOnInit();
  }

}
