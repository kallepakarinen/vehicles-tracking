import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Vehicle} from '../Vehicle';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../Payment';

@Injectable({
  providedIn: 'root'
})
export class PayHttpService {
url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiEndpointUrl + '/vehicles';
  }
    getPaymentPay(vehicleId): Observable<Payment> {
     return this.httpClient.get(this.url + '/' + vehicleId + '?_embed=payments').pipe(map(response => {
       return response as Payment;
     }));
  }
}
