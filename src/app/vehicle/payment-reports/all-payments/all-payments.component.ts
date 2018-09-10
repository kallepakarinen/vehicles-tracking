import {Component, OnInit} from '@angular/core';
import {ReportService} from '../report-services/report.service';
import {Payment} from '../../Payment';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {VehicleService} from '../../services/vehicle.service';
import {ReportPayment} from '../../ReportPayment';
import Chart from 'chart.js';
import {Vehicle} from '../../Vehicle';
import {ToolbarOptions} from '../../ui/toolbar/toolbar-options';
import {ToolbarService} from '../../ui/toolbar/toolbar.service';
import * as moment from 'moment';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import _quarter = moment.unitOfTime._quarter;

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
    'rgba(255, 206, 86, 1)',
    'rgba(255, 111, 86, 1)'
  ];

  payments: Payment[];
  // testPayments: Payment[];
  // sum all payments
  totalPayments: string[];
  fuelTotal: number;
  partsTotal: number;
  serviceTotal: number;
  insuranceTotal: number;
  taxTotal: number;
  // Quartals
  vehicleQuartals: ReportPayment;
  piirakkaTaulukko: ReportPayment[];
  quartalPayments: Payment[];
  yearPayment: Payment[];

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


// Vehicle payments
  fuelVehicleSum: number;
  serviceVehicleSum: number;
  partsVehicleSum: number;
  insuranceVehicleSum: number;
  taxVehicleSum: number;

  year: any;
  // sums
  vehicleTotalSum: number[];
  quartalSum: number[];
  Q1: number[];
  Q2: number[];
  quartalTotalSum: any;
  summa: number[];

  constructor(private reportService: ReportService, private route: ActivatedRoute,
              private vehicleService: VehicleService, private toolbar: ToolbarService) {
    this.payments = [];
    this.vehicles = [];
    this.vehicleQuartals = new ReportPayment();
    this.piirakkaTaulukko = [];
    this.vehicleTotalSum = [];
    this.quartalPayments = [];
    this.quartalSum = [];
    this.quartalTotalSum = [];
    this.Q1 = [];
    this.Q2 = [];
    this.summa = [];
    this.year = new Date().getFullYear();
    this.yearPayment = [];
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Raportti', []));
    this.vehicles = this.vehicleService.getVehicles();
    this.vehicleCount = _.size(this.vehicles);
    this.totalPayments = this.reportService.getAllPayments();

    //////////////////// Quarted sum filter
    const quarterlyPayments = [[], [], [], []];
    const quarterlysum = [[], [], [], []];
    this.vehicleQuartals.fuel = [[], [], [], []];
    this.vehicleQuartals.service = [[], [], [], []];
    this.vehicleQuartals.parts = [[], [], [], []];
    this.vehicleQuartals.insurance = [[], [], [], []];
    this.vehicleQuartals.tax = [[], [], [], []];
    this.vehicleQuartals.quarterlySum = [[], [], [], []];

    const year = this.year;

    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }

    let groupedYear = groupBy(this.totalPayments, payment => moment(payment.day).year());
    groupedYear = groupedYear.get(year);
    groupedYear.forEach((payment) => {
      const quarter = moment(payment.day).quarter();
      const index = quarter - 1;
      quarterlyPayments[index].push(payment);
    });

    this.vehicles.forEach((vehicle) => {
      console.log('VehicleId: ' + vehicle.id);
      let vehicleReportData = new ReportPayment();
      vehicleReportData.vehicleId = vehicle.id;
      console.log(vehicleReportData);
      quarterlyPayments.forEach((quarterlyData, index) => {
        const quarter = index + 1;
        vehicleReportData.fuel[index] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === vehicle.id), 'fuel') || 0;
        vehicleReportData.service[index] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === vehicle.id), 'service') || 0;
        vehicleReportData.parts[index] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === vehicle.id), 'parts') || 0;
        vehicleReportData.insurance[index] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === vehicle.id), 'insurance') || 0;
        vehicleReportData.tax[index] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === vehicle.id), 'tax') || 0;
        vehicleReportData.quarterlySum[index] = vehicleReportData.fuel[index] + vehicleReportData.service[index] +
          vehicleReportData.parts[index] + vehicleReportData.insurance[index] + vehicleReportData.tax[index];
      });
      vehicleReportData.yearlySum = vehicleReportData.quarterlySum.reduce((a, b) => a + b, 0);
      this.piirakkaTaulukko.push(vehicleReportData);
    });
    console.log(this.piirakkaTaulukko);

    /*
    for (let i = 1; i <= this.vehicleCount; i++) {
      quarterlyPayments.forEach((quarterlyData, index) => {
        const quarter = index + 1;
        console.log('Quearter: ' + quarter);
        console.log(quarterlyData);
        this.vehicleQuartals.fuel[quarter] = _.sumBy(quarterlyData.filter(payment => payment.vehicleId === i), 'fuel') || 0;

        /*        this.vehicleQuartals.service[quarter] = _.sumBy(quarterlyData, 'service') || 0;
                this.vehicleQuartals.parts[quarter] = _.sumBy(quarterlyData, 'parts') || 0;
                this.vehicleQuartals.insurance[quarter] = _.sumBy(quarterlyData, 'insurance') || 0;
                this.vehicleQuartals.tax[quarter] = _.sumBy(quarterlyData, 'tax') || 0;
                this.vehicleQuartals.quarterlySum[quarter] = this.vehicleQuartals.fuel[quarter] + this.vehicleQuartals.service[quarter] +
                  this.vehicleQuartals.parts[quarter] + this.vehicleQuartals.insurance[quarter] + this.vehicleQuartals.tax[quarter];*/
    // Logic for processing each quarter
    /*
          });
    */
    // this.vehicleQuartals.yearlySum = this.vehicleQuartals.quarterlySum.reduce((a, b) => a + b, 0);
    /*
        console.log('VehicleQQQQ');
        console.log(this.vehicleQuartals);
        this.piirakkaTaulukko.push(this.vehicleQuartals);
      }
      */

    // this.vehicleQuartals.vehicleName = this.vehicles[1].mark + ' ' + this.vehicles[1].registration;
    // this.vehicleQuartals.vehicleId = this.vehicles[1].id;
    //console.log(this.piirakkaTaulukko);
    /*
       // gives true and false objects
       const testPayments = _.groupBy(this.totalPayments, payment => payment.vehicleId === 1);
       console.log(testPayments);
       */

    /*


    // Filter totalPayments by year
    this.yearPayment = this.totalPayments.filter(yearFilter);
    console.log(this.yearPayment);
    // Filter yearly payments from the previous step into four "buckets"
    // momentjs provides function for finding out the quarter
    let quarterlyPayments = [[], [], [], []];

    for (const payment of this.yearPayment) {
      // Find out quarter with moment
     // let quarter = 1; moment(payment.day).quarter();
      let quarter = moment(payment.day).quarter();
      let index = quarter - 1;
      quarterlyPayments[index].push(payment);
    }
    console.log(quarterlyPayments);

    quarterlyPayments.forEach((quarterlyData, index) => {
      const quarter = index + 1;

      // Logic for processing each quarter
    });*/


    /*  function q1(payment) {
        return payment.day >= year + '-09-01' && payment.day <= year + '-09-30';
      }

      function q2(payment) {
        return payment.day >= year + '-10-01' && payment.day <= year + '-10-31';
      }

      for (this.i = 0; this.i < this.vehicleCount; this.i++) {
        // get vehicles mark and name. uses pie charts.
        const vehicleName = this.vehicles[this.i].mark + ' ' + this.vehicles[this.i].registration;
        this.charLabel.push(vehicleName);
  */
    // quartals
    /*  for (let q = 0; q < 2; q++) {
        if (q === 0) {
          this.quartalPayments = this.totalPayments.filter(q1);
        }
        if (q === 1) {
          this.quartalPayments = this.totalPayments.filter(q2);
        }

        this.fuelQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'fuel') || 0;
        this.partsQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'parts') || 0;
        this.serviceQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'service') || 0;
        this.insuranceQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'insurance') || 0;
        this.taxQuartal = _.sumBy(this.quartalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'tax') || 0;
        if (q === 0) {
          this.Q1.push(this.fuelQuartal + this.partsQuartal + this.serviceQuartal + this.insuranceQuartal + this.taxQuartal);
        }
        if (q === 1) {
          this.Q2.push(this.fuelQuartal + this.partsQuartal + this.serviceQuartal + this.insuranceQuartal + this.taxQuartal);
        }
      }*/


    /*   // get vehicles sum for payments
       this.fuelVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'fuel') || 0;
       this.serviceVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'service') || 0;
       this.partsVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'parts') || 0;
       this.insuranceVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'insurance') || 0;
       this.taxVehicleSum = _.sumBy(this.totalPayments.filter(vehicleId => vehicleId.vehicleId === this.i + 1), 'tax') || 0;
       this.vehicleTotalSum.push(
         this.fuelVehicleSum + this.serviceVehicleSum + this.partsVehicleSum + this.insuranceVehicleSum + this.taxVehicleSum);
     }
     // this.quartalTotalSum.push([this.quartalSum]);
     console.log(this.quartalTotalSum);*/


    /*     // this.vehicleFilter = _.filter(response, {'vehicleId': this.i});
         this.fuelTotal = _.sumBy(this.totalPayments, 'fuel');
         this.serviceTotal = _.sumBy(this.totalPayments, 'service');
         this.partsTotal = _.sumBy(this.totalPayments, 'parts');
         this.insuranceTotal = _.sumBy(this.totalPayments, 'insurance');
         this.taxTotal = _.sumBy(this.totalPayments, 'tax');
         //  this.fuelTotal = _.sumBy(response, 'fuel');
   */
  }
}


