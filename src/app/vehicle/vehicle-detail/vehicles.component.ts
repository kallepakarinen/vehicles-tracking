import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../Vehicle';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../services/payment.service';
import * as _ from 'lodash';
import {Payment} from '../Payment';
import {ToolbarService} from '../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../ui/toolbar/toolbar-options';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: any;
  payments: Payment[];
  partsTotal;
  kilometersTotal;
  fuelTotal;
  serviceTotal;
  insuranceTotal;
  taxTotal;
  cars: string[];

  vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService,
              private router: Router, private route: ActivatedRoute,
              private paymentService: PaymentService, private toolbar: ToolbarService) {
    this.vehicle = new Vehicle();
    this.vehicles = [];
    this.payments = [];
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Lisää ajoneuvo', []));
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];
      this.vehicleId = this.route.snapshot.paramMap.get('id');
      /*  this.paymentService.getVehiclePayments(this.vehicleId).subscribe(response => {
          this.fuelTotal = _.sumBy(response, 'fuel');
          this.serviceTotal = _.sumBy(response, 'service');
          this.partsTotal = _.sumBy(response, 'parts');
          this.insuranceTotal = _.sumBy(response, 'insurance');
          this.taxTotal = _.sumBy(response, 'tax');
        });*/
      if (this.vehicleId !== null) {
        this.vehicle = this.vehicleService.getVehicleById(+this.vehicleId);
        this.payments = this.paymentService.getVehiclePayments(+this.vehicleId);
        this.fuelTotal = _.sumBy(this.payments, 'fuel');
        this.serviceTotal = _.sumBy(this.payments, 'service');
        this.partsTotal = _.sumBy(this.payments, 'parts');
        this.insuranceTotal = _.sumBy(this.payments, 'insurance');
        this.taxTotal = _.sumBy(this.payments, 'tax');
      }
    });
  }

  onSave() {
    console.log(this.vehicle);
    this.vehicleService.createVehicle(this.vehicle);
    this.router.navigate(['/vehicles']);
  }

}
