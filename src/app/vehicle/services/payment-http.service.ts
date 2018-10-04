import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {Payment} from '../Payment';
import {ReportPayment} from '../ReportPayment';


@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiEndpointUrl + '/payments';
  }

  getVehiclePayments(id): Observable<Payment[]> {
    return this.httpClient.get('http://localhost:59028/api/vehicles/' + id + '/payments').pipe(map(response => {
      return response as Payment[];
    }));
  }

  getPaymentById(id): Observable<Payment> {
    return this.httpClient.get(this.url + '/' + id).pipe(map(response => {
      return response as Payment;
    }));
  }

  updatePayment(payment): Observable<Payment> {
    return this.httpClient.put(this.url + '/' + payment.id, payment).pipe(map(response => {
      return response as Payment;
    }));
  }

  createPayment(payment): Observable<Payment> {
   return this.httpClient.post(this.url, payment).pipe(map(response => {
     return response as Payment;
   }));
  }

  deletePayment(payment): Observable<any> {
    return this.httpClient.delete(this.url + '/' + payment.id);
  }
  reportPayment(year): Observable<ReportPayment[]> {
    console.log(year);
    return this.httpClient.get(this.url + '/report/' + year).pipe(map(response => {
      return response as ReportPayment[];
    }));
  }

}
