import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Payment} from '../Payment';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../services/payment.service';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {NotificationComponent} from '../notification/notification.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})

export class PaysComponent implements OnInit {
  payment: Payment;
  paymentId: any;
  vehicleId: any;

  constructor(@Inject(LOCALE_ID) private locale: string,
              private route: ActivatedRoute, private router: Router, private paymentService:
                PaymentService, public dialog: MatDialog) {
    this.payment = new Payment();
  }

  ngOnInit() {
    this.paymentId = this.route.snapshot.paramMap.get('id');
    if (this.paymentId !== null) {
      this.payment = this.paymentService.getPaymentById(+this.paymentId);
    }
    this.vehicleId = this.route.snapshot.paramMap.get('vehicle');
  }


  updatePayment(payment) {
    this.paymentService.updatePayment(payment);
    this.router.navigate(['/vehicles/' + payment.vehicleId]);
  }


  createPayment(payment): void {
    if (this.payment.day === undefined) {
      this.openDialog();
    } else {
      payment.vehicleId = Number(this.vehicleId);
      this.paymentService.createPayment(payment);
      this.router.navigate(['/vehicles/' + payment.vehicleId]);
    }
  }

  test() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '250px',
      role: 'alertdialog',
      data: 'Aseta päivämäärä'
    });
  }
}
