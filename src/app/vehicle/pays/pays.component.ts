import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Payment} from '../Payment';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../services/payment.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {NotificationDialogComponent} from '../notifications/notification-dialog/notification-dialog.component';
import {NotificationSnackbarComponent} from '../notifications/notification-snackbar/notification-snackbar.component';
import {ToolbarService} from '../ui/toolbar/toolbar.service';
import {ToolbarOptions} from '../ui/toolbar/toolbar-options';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})

export class PaysComponent implements OnInit {
  payment: Payment;
  paymentId: any;
  vehicleId: any;
  dialogRef: MatDialogRef<NotificationDialogComponent>;

  constructor(@Inject(LOCALE_ID) private locale: string,
              private route: ActivatedRoute, private router: Router, private paymentService:
                PaymentService, public dialog: MatDialog, public snackBar: MatSnackBar,
              private toolbar: ToolbarService) {
    this.payment = new Payment();
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Muokkaa maksutapahtuma', []));
    this.paymentId = this.route.snapshot.paramMap.get('id');
    if (this.paymentId !== null) {
      this.payment = this.paymentService.getPaymentById(+this.paymentId);
    }
    this.vehicleId = this.route.snapshot.paramMap.get('vehicle');
  }

  updatePayment(payment): void {
    this.dialogRef = this.dialog.open(NotificationDialogComponent, {
      disableClose: false,
      width: '250px',
    });
    this.dialogRef.componentInstance.data = 'Muokataanko maksutapahtuma?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentService.updatePayment(payment);
        this.openSnackBar();
        this.router.navigate(['/payments', this.payment.vehicleId]);
      }
      this.dialogRef = null;
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      data: 'Maksun muokkaus onnistui!',
      duration: 2000,
    });
  }

}
