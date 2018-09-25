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
import {PaymentService} from '../../services/payment.service';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  // Vehicles
  vehicles: Vehicle[];

  view: any[] = [700, 300];
  Legend = 'Vuosikulutus';
  // options
  allPaymentsChartData: ChartData[];
  quartalPaymentsChartData1: ChartData[];
  quartalPaymentsChartData2: ChartData[];
  quartalPaymentsChartData3: ChartData[];
  quartalPaymentsChartData4: ChartData[];
  gradient = false;

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
  };

  payments: Payment[];
  totalPayments: string[];
  reportPayment: ReportPayment[];

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

  constructor(private paymentService: PaymentService, private route: ActivatedRoute,
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
    this.quartalPaymentsChartData1 = [];
    this.quartalPaymentsChartData2 = [];
    this.quartalPaymentsChartData3 = [];
    this.quartalPaymentsChartData4 = [];

    // http dev
    this.reportPayment = [];
  }

  ngOnInit() {
   this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Raportti', []));
   // this.vehicles = this.vehicleService.getVehicles();
   // this.vehicleCount = _.size(this.vehicles);
   // this.totalPayments = this.reportService.getAllPayments();
    this.paymentService.paymentReport().subscribe(response => {
      console.log(response);
      this.reportPayment = response;
    });



   //    this.quartalPaymentsChartData2 = arrays[1];
    //   this.quartalPaymentsChartData3 = arrays[2];
    //   this.quartalPaymentsChartData4 = arrays[3];

  }



  onSelect(event) {
    console.log(event);
  }
}


