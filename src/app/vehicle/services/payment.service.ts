import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {PaymentHttpService} from './payment-http.service';
import {Payment} from '../Payment';
import {LocalStorageService} from './local-storage.service';
import {Vehicle} from '../Vehicle';
import {ReportPayment} from '../ReportPayment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private paymentHttpService: PaymentHttpService, private localStorageService: LocalStorageService) {
  }

  getVehiclePayments(vehicleId: number): Observable<Payment[]> {
    return this.paymentHttpService.getVehiclePayments(vehicleId);
  }

  getPaymentById(paymentId): Observable<Payment> {
    return this.paymentHttpService.getPaymentById(paymentId);
  }

  updatePayment(payment): Observable<Payment> {
    return this.paymentHttpService.updatePayment(payment);
  }

  createPayment(payment): Observable<Payment> {
    return this.paymentHttpService.createPayment(payment);
  }

  deletePayment(payment): Observable<any> {
    return this.paymentHttpService.deletePayment(payment);
  }

  paymentReport(year): Observable<ReportPayment[]> {
    return this.paymentHttpService.reportPayment(year);
  }

}
