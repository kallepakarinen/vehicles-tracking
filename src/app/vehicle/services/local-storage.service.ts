import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Vehicle} from '../Vehicle';
import {Payment} from '../Payment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private vehiclesStorageKey = 'va-vehicles';
  private paymentsStorageKey = 'va-payment';
  vehicles: Vehicle[];
  payments: Payment[];

  constructor() {
    if (!localStorage.getItem(this.vehiclesStorageKey)) {
      localStorage.setItem(this.vehiclesStorageKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.paymentsStorageKey)) {
      localStorage.setItem(this.paymentsStorageKey, JSON.stringify([]));
    }
  }

// Vehicles
  public loadVehicles() {
    return this.getLocalStorageData();
  }

  getVehicleById(vehicleId: number) {
    this.vehicles = this.getLocalStorageData();
    return this.vehicles.find(v => v.id === vehicleId);
  }


  public saveVehicle(vehicle: Vehicle) {
    this.vehicles = this.getLocalStorageData();
    console.log(this.vehicles.length);
    if (this.vehicles.length < 1) {
      vehicle.id = 1;
    } else {
      vehicle.id = this.vehicles.length + 1;
    }
    this.vehicles.push(vehicle);
    this.setLocalStorageData(this.vehicles);
  }

  private getLocalStorageData() {
    const data = localStorage.getItem(this.vehiclesStorageKey);
    return JSON.parse(data);
  }

  private setLocalStorageData(givenData) {
    const vehicles = JSON.stringify(givenData);
    localStorage.setItem(this.vehiclesStorageKey, vehicles);
  }

// Payments
  public loadPayments() {
    return this.getLocalStoragePaymentData();
  }

  public loadVehiclePayments(vehicleId: number) {
    this.payments = this.loadPayments().filter(p => p.vehicleId === vehicleId);
    return this.payments;
  }

  getPaymentById(paymentId: number) {
    this.payments = this.loadPayments();
    console.log(paymentId);
    return this.payments.find(p => p.id === paymentId);
  }

  public savePayment(payment: Payment) {
    this.payments = this.getLocalStoragePaymentData();
    if (this.payments.length < 1) {
      payment.id = 1;
    } else {
      payment.id = this.payments.length + 1;
    }
    this.payments.push(payment);
    this.setLocalStoragePaymentData(this.payments);
  }

  public updatePayment(payment: Payment) {
    if (payment) {
      this.payments = this.loadPayments();
      const paymentIndex = _.findIndex(this.payments, ['id', payment.id]);
      if (paymentIndex >= 0) {
        this.payments.splice(paymentIndex, 1, payment);
        this.setLocalStoragePaymentData(this.payments);
      }
    }
  }

  private getLocalStoragePaymentData() {
    const data = localStorage.getItem(this.paymentsStorageKey);
    return JSON.parse(data);
  }

  private setLocalStoragePaymentData(givenData) {
    const payments = JSON.stringify(givenData);
    localStorage.setItem(this.paymentsStorageKey, payments);
  }
}
