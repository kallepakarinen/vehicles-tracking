import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Payment} from '../../Payment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportHttpService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiEndpointUrl + '/payments';
  }

  getAllPayments(): Observable<Payment[]> {
    return this.httpClient.get(this.url).pipe(map(response => {
      return response as Payment[];
    }));
  }
}
