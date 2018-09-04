import {Component, OnInit} from '@angular/core';
import {ReportService} from '../report-services/report.service';
import {Payment} from '../../Payment';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {VehicleService} from '../../services/vehicle.service';
import {DatePipe} from '@angular/common';
import {DateFormatPipe} from '../../pipes/date-format.pipe';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  payments: Payment[];
  // sum all payments
  totalPayments: Payment[];
  fuelTotal: number;
  partsTotal: number;
  serviceTotal: number;
  insuranceTotal: number;
  taxTotal: number;
  // Qvartaals
  qvartals: Payment[];
  fuelQvartal: number;
  partsQvartal: number;
  serviceQvartal: number;
  insuranceQvartal: number;
  taxqvartal: number;


  vehicleFuelTotal;
  vehicleServiceTotal;
  vehicleCount;


  quarterly = [];

  total: number;
  i: number;

  newDate: any;
  testi: Payment[];

  constructor(private reportService: ReportService, private route: ActivatedRoute, private vehicleService: VehicleService) {
    this.payments = [];
  }


  ngOnInit() {
    /*  this.vehicleService.getVehicles().subscribe(response => {
        this.vehicleCount = _.size(response);
      });*/

    this.totalPayments = this.reportService.getAllPayments();

    function q1(payment) {
      return payment.day >= '2018-09-01' && payment.day <= '2018-09-30';
    }


    this.fuelQvartal = _.sumBy(this.totalPayments.filter(q1), 'fuel');
    this.qvartals.push();
    this.partsQvartal = _.sumBy(this.totalPayments.filter(q1), 'parts');
    this.serviceQvartal = _.sumBy(this.totalPayments.filter(q1), 'service');
    this.insuranceQvartal = _.sumBy(this.totalPayments.filter(q1), 'insurance');
    this.taxqvartal = _.sumBy(this.totalPayments.filter(q1), 'tax');

    console.log(this.totalPayments);
    // this.fuelQ1Total = _.sumBy(q1Payments, 'fuel');


    for (this.i = 1; this.i < this.vehicleCount; this.i++) {
    }
    // this.vehicleFilter = _.filter(response, {'vehicleId': this.i});
    this.fuelTotal = _.sumBy(this.totalPayments, 'fuel');
    this.serviceTotal = _.sumBy(this.totalPayments, 'service');
    this.partsTotal = _.sumBy(this.totalPayments, 'parts');
    this.insuranceTotal = _.sumBy(this.totalPayments, 'insurance');
    this.taxTotal = _.sumBy(this.totalPayments, 'tax');
    //  this.fuelTotal = _.sumBy(response, 'fuel');

  }
}

