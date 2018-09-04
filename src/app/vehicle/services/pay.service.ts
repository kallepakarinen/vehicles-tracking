import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Vehicle} from '../Vehicle';
import {PayHttpService} from './pay-http.service';
import {Payment} from '../Payment';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private payHttpService: PayHttpService) { }
   getPaymentPay(vehicleId): Observable<Payment> {
    return this.payHttpService.getPaymentPay(vehicleId);
  }
}
