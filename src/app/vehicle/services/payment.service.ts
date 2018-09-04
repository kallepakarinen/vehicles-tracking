import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {PaymentHttpService} from './payment-http.service';
import {Payment} from '../Payment';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private paymentHttpService: PaymentHttpService, private localStorageService: LocalStorageService) {
  }

  getVehiclePayments(vehicleId: number) {
    return this.localStorageService.loadVehiclePayments(vehicleId);
  }

  getPaymentById(paymentId) {
    return this.localStorageService.getPaymentById(paymentId);
  }

  updatePayment(payment) {
    return this.localStorageService.updatePayment(payment);
  }

  createPayment(payment) {
    return this.localStorageService.savePayment(payment);
  }

}
