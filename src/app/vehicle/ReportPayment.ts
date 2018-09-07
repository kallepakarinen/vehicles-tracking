export class ReportPayment {
  vehicleId: number;
  vehicleName: string;
  fuel: number;
  service: number;
  parts: number;
  insurance: number;
  tax: number;
  yearlySum: number;
  querterlySum: number[];

  constructor(
    vehicleId?: number,
    vehicleName?: string,
    fuel?: number,
    service?: number, parts?: number,
    insurance?: number, tax?: number,
    yearlySum?: number, querterlySum?: number[]
  ) {
    this.vehicleId = vehicleId;
    this.vehicleName = vehicleName;
    this.fuel = fuel;
    this.service = service;
    this.parts = parts;
    this.insurance = insurance;
    this.tax = tax;
    this.yearlySum = yearlySum;
    this.querterlySum = querterlySum;
  }
}
