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

  // Quartals
  vehicleQuartals: ReportPayment;
  piirakkaTaulukko: ReportPayment[];
  quartalPayments: Payment[];
  yearPayment: Payment[];

  vehicleCount;

  myChart: any;
  charLabel = [];
  total: number;

  year: any;
  // sums
  vehicleTotalSum: number[];
  quartalSum: number[];
  quartalTotalSum: any;

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
  }
}


