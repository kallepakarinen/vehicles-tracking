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
  activeVehicles: Vehicle[];
  disableVehicles: Vehicle[];
  vehicleId: any;
  editingEnabled: boolean;
  checked: boolean;
  slideText = '';

  constructor(@Inject(LOCALE_ID) private locale: string, private vehicleService: VehicleService,
              private router: Router, private route: ActivatedRoute,
              private toolbar: ToolbarService, public snackBar: MatSnackBar) {
    this.vehicle = new Vehicle();
    this.activeVehicles = [];
    this.disableVehicles = [];
    this.editingEnabled = false;
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Lisää ajoneuvo', []));
    this.vehicleService.getVehicles().subscribe(response => {
      this.activeVehicles = response.filter(i => i.active === true);
      this.disableVehicles = response.filter(i => i.active === false);
    });
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];
      if (this.vehicleId !== undefined) {
        this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Muokkaa tietoja', []));
        this.editingEnabled = true;
        this.vehicleService.getVehicleById(+this.vehicleId).subscribe(response => {
          this.vehicle = response;
          this.checked = this.vehicle.active;
          if (this.checked === true) {
            console.log(this.checked);
            this.slideText = 'Ajoneuvo  on käytössä';
          } else {
            this.slideText = 'ajoneuvo on poistettu käytöstä';
          }
        });
      }
    });
  }

  onVehicleSave(): void {
    this.vehicle.active = true;
    this.vehicleService.createVehicle(this.vehicle).subscribe(response => {
      this.ngOnInit();
    });
    this.openSnackBar();
  }

  OnVehicleUpdate(vehicle): void {
    this.changed();
    console.log(this.vehicle);
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
  }

  changed() {
    this.vehicle.active = this.checked;
    if (this.checked === true) {
      this.slideText = 'Ajoneuvo  on käytössä';
    } else {
      this.slideText = 'ajoneuvo on poistettu käytöstä';
    }
  }
}
