import {Component, OnInit} from '@angular/core';
import {ReportService} from '../report-services/report.service';
import {Payment} from '../../Payment';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {VehicleService} from '../../services/vehicle.service';
import {ReportPayment} from '../../ReportPayment';
import Chart from 'chart.js';
import {Vehicle} from '../../Vehicle';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  // Vehicles
  vehicles: Vehicle[];

  // Canvas pie chart
  canvas: any;
  ctx: any;
  pieChartColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)'
  ];

  payments: Payment[];
  // sum all payments
  totalPayments: Payment[];
  fuelTotal: number;
  partsTotal: number;
  serviceTotal: number;
  insuranceTotal: number;
  taxTotal: number;
  // Quartals
  quartals: ReportPayment;
  quartalPayments: Payment[];

  fuelQuartal: number;
  partsQuartal: number;
  serviceQuartal: number;
  insuranceQuartal: number;
  taxQuartal: number;
  // vehicles payment



  vehicleFuelTotal;
  vehicleServiceTotal;
  vehicleCount;

  myChart: any;
  charLabel = [];
  total: number;
  i: number;


// Vehicle payments
  fuelVehicleSum: number;
  serviceVehicleSum: number;
  partsVehicleSum: number;
  insuranceVehicleSum: number;
  taxVehicleSum: number;


  // sums
  vehicleTotalSum: number[];
  quarta1TotalSum:number[] ;
  constructor(private reportService: ReportService, private route: ActivatedRoute, private vehicleService: VehicleService) {
    this.payments = [];
    this.vehicles = [];
    this.quartals = new ReportPayment();
    this.vehicleTotalSum = [];
    this.quartalPayments = [];
    this.quarta1TotalSum = [];
  }


  ngOnInit() {
    this.vehicles = this.vehicleService.getVehicles();
    this.vehicleCount = _.size(this.vehicles);
    this.totalPayments = this.reportService.getAllPayments();
    /*  this.vehicleService.getVehicles().subscribe(response => {
        this.vehicleCount = _.size(response);
      });*/
    //////////////////// Quarted sum filter
    function q1(payment) {
      return payment.day >= '2018-09-01' && payment.day <= '2018-09-30';
    }
    function q2(payment) {
      return payment.day >= '2018-10-01' && payment.day <= '2018-10-30';
    }
    this.quartalPayments = this.totalPayments.filter(q1);
    console.log(this.quartalPayments);



    for (this.i = 0; this.i < this.vehicleCount; this.i++) {
      // get vehicles mark and name. uses pie charts.
      const vehicleName = this.vehicles[this.i].mark + ' ' + this.vehicles[this.i].registration;
      this.charLabel.push(vehicleName);

      // quartals
      this.fuelQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'fuel') || 0;
      this.partsQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'parts') || 0;
      this.serviceQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'service') || 0;
      this.insuranceQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'insurance') || 0;
      this.taxQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'tax') || 0;
      this.quarta1TotalSum.push(this.fuelQuartal + this.partsQuartal + this.serviceQuartal + this.insuranceQuartal + this.taxQuartal);
      console.log(this.quarta1TotalSum);


      // get vehicles sum for payments
      this.fuelVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'fuel') || 0;
      this.serviceVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'service') || 0;
      this.partsVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'parts') || 0;
      this.insuranceVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'insurance') || 0;
      this.taxVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'tax') || 0;
      this.vehicleTotalSum.push(this.fuelVehicleSum + this.serviceVehicleSum + this.partsVehicleSum + this.insuranceVehicleSum + this.taxVehicleSum);
    }







    // this.vehicleFilter = _.filter(response, {'vehicleId': this.i});
    this.fuelTotal = _.sumBy(this.totalPayments, 'fuel');
    this.serviceTotal = _.sumBy(this.totalPayments, 'service');
    this.partsTotal = _.sumBy(this.totalPayments, 'parts');
    this.insuranceTotal = _.sumBy(this.totalPayments, 'insurance');
    this.taxTotal = _.sumBy(this.totalPayments, 'tax');
    //  this.fuelTotal = _.sumBy(response, 'fuel');


    this.canvas = document.getElementById('vehiclesTotal');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.charLabel,
        datasets: [{
          label: 'sum of Cars',
          data: this.vehicleTotalSum,
          backgroundColor: this.pieChartColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });


    this.canvas = document.getElementById('quartal');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.charLabel,
        datasets: [{
          label: 'sum of qartals',
          data: this.quarta1TotalSum,
          backgroundColor: this.pieChartColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });






    this.quartals.fuel = this.fuelQuartal;
    this.quartals.parts = this.partsQuartal;
    this.quartals.service = this.serviceQuartal;
    this.quartals.insurance = this.insuranceQuartal;
    this.quartals.tax = this.taxQuartal;
///////////////////////////
  }
}

