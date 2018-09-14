import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment} from '../Payment';
import {PaymentService} from '../services/payment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import * as _ from 'lodash';
import {ChartData} from '../ChartData';
import {ToolbarService} from '../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../ui/toolbar/toolbar-options';
import {NotificationSnackbarComponent} from '../notifications/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})

export class PaymentListComponent implements OnInit {
  selectedValue: string;

  selectPayments = [
    {value: 'fuel', viewValue: 'Polttoaine'},
    {value: 'service', viewValue: 'Huolto'},
    {value: 'parts', viewValue: 'Varaosat'},
    {value: 'insurance', viewValue: 'Vakuutukset'},
    {value: 'tax', viewValue: 'Verot'}
  ];


  view: any[] = [700, 300];
  Legend = 'Kokonaiskulutus';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  allPaymentsChartData: ChartData[];
  payment: Payment;
  payments: Payment[];
  paymentInput: number;
  vehicleId: any;
  dataSource;
  fuel: ChartData;
  service: ChartData;
  parts: ChartData;
  insurance: ChartData;
  tax: ChartData;
  taxTotal;
  displayedColumns: string[] = ['day', 'kilometers', 'fuel', 'service', 'parts', 'insurance', 'tax', 'comment'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router,  private toolbar: ToolbarService, public snackBar: MatSnackBar) {
    this.payments = [];
    this.dataSource = new MatTableDataSource(this.payments);
    this.dataSource.sort = this.sort;
    this.allPaymentsChartData = [];
    this.payment = new Payment();
    this.paymentInput = 0;
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Maksujen syöttö', []));
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];

      this.payments = this.paymentService.getVehiclePayments(+this.vehicleId);
      /*this.serviceTotal = _.sumBy(response, 'service');
      this.partsTotal = _.sumBy(response, 'parts');
      this.insuranceTotal = _.sumBy(response, 'insurance');
      this.taxTotal = _.sumBy(response, 'tax');
      */
      this.allPaymentsChartData = [];
      this.fuel = new ChartData();
      this.service = new ChartData();
      this.parts = new ChartData();
      this.insurance = new ChartData();
      this.tax = new ChartData();
      this.fuel.name = 'Polttoaine';
      this.fuel.value = _.sumBy(this.payments, 'fuel') || 0;

      this.service.name = 'Huolto';
      this.service.value = _.sumBy(this.payments, 'service') || 0;

      this.parts.name = 'Varaosat';
      this.parts.value = _.sumBy(this.payments, 'parts') || 0;

      this.insurance.name = 'Vakuutukset';
      this.insurance.value = _.sumBy(this.payments, 'insurance') || 0;

      this.tax.name = 'Verot';
      this.tax.value = _.sumBy(this.payments, 'tax') || 0;
      this.allPaymentsChartData.push(this.fuel, this.service, this.parts, this.insurance, this.tax);

      console.log(this.allPaymentsChartData);
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;

    });
  }

  onSelectPayment(payment): void {
    this.router.navigate(['/pays', payment.id]);
  }

  createPayment(): void {
    if (this.selectedValue === 'fuel') {
      this.payment.fuel = this.paymentInput;
    }
    if (this.selectedValue === 'service') {
      this.payment.service = this.paymentInput;
    }   if (this.selectedValue === 'parts') {
      this.payment.parts = this.paymentInput;
    }   if (this.selectedValue === 'insurance') {
      this.payment.insurance = this.paymentInput;
    }   if (this.selectedValue === 'tax') {
      this.payment.tax = this.paymentInput;
    }
    this.payment.vehicleId = Number(this.vehicleId);
    this.paymentService.createPayment(this.payment);
    this.openSnackBar();
    this.router.navigate(['/payments', this.payment.vehicleId]);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      data: 'Tallennus onnistui!',
      duration: 2000,
    });
  }
}
