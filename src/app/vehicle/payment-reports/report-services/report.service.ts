import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Payment} from '../../Payment';
import {ReportHttpService} from './report-http.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private localStorageService: LocalStorageService) { }
  getAllPayments() {
    return this.localStorageService.loadPayments();
  }
}
