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
import {ChartData} from '../../ChartData';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  // Vehicles
  vehicles: Vehicle[];

  view: any[] = [700, 400];
  // options
  allPaymentsChartData: ChartData[];
  quartalPaymentsChartData: ChartData[];
  gradient = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  payments: Payment[];
  totalPayments: string[];

  // Quartals
  vehicleQuartals: ReportPayment;
  vehicleReport: ReportPayment[];
  yearPayment: Payment[];
  vehicleCount;
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
    this.vehicleReport = [];
    this.vehicleTotalSum = [];
    //   this.quartalPayments = [];
    this.quartalSum = [];
    this.quartalTotalSum = [];
    this.year = new Date().getFullYear();
    this.yearPayment = [];
    this.allPaymentsChartData = [];
    this.quartalPaymentsChartData = [];
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
      const vehicleReportData = new ReportPayment();
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
      vehicleReportData.vehicleName = vehicle.mark + ' ' + vehicle.registration;
      this.vehicleReport.push(vehicleReportData);
    });

    // chart data
    for (let i = 0; i < this.vehicleCount; i++) {
      const allPaymentData = new ChartData();
      allPaymentData.name = this.vehicleReport[i].vehicleName;
      allPaymentData.value = this.vehicleReport[i].yearlySum;
      this.allPaymentsChartData.push(allPaymentData);
      const quartalPaymentsData = new ChartData();
      quartalPaymentsData.name = this.vehicleReport[i].vehicleName;
      quartalPaymentsData.value = this.vehicleReport[i].quarterlySum[0];
      this.quartalPaymentsChartData.push(quartalPaymentsData);
    }
    console.log(this.vehicleReport);
    console.log(this.quartalPaymentsChartData);
  }


  onSelect(event) {
    console.log(event);
  }
}


