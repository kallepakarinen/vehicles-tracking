import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment} from '../Payment';
import {PaymentService} from '../services/payment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})

export class PaymentListComponent implements OnInit {
  payments: Payment[];
  vehicleId: any;
  dataSource;
  partsTotal;
  serviceTotal;
  insuranceTotal;
  taxTotal;
  displayedColumns: string[] = ['day', 'kilometers', 'fuel', 'service', 'parts', 'insurance', 'tax'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router) {
    this.payments = [];
    this.dataSource = new MatTableDataSource(this.payments);
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];

     this.payments = this.paymentService.getVehiclePayments(+this.vehicleId);
        /*this.serviceTotal = _.sumBy(response, 'service');
        this.partsTotal = _.sumBy(response, 'parts');
        this.insuranceTotal = _.sumBy(response, 'insurance');
        this.taxTotal = _.sumBy(response, 'tax');
        */
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.sort = this.sort;

    });
  }

  onSelectPayment(payment): void {
    this.router.navigate(['/pays', payment.id]);
  }

  createPayment(): void {
    this.router.navigate(['/pays/new', this.vehicleId]);
  }
}
