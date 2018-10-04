export class ReportPayment {
  fuel: number;
  service: number;
  parts: number;
  insurance: number;
  tax: number;

  constructor(
    fuel?: number,
    service?: number, parts?: number,
    insurance?: number, tax?: number,
  ) {
    this.fuel = fuel;
    this.service = service;
    this.parts = parts;
    this.insurance = insurance;
    this.tax = tax;
  }
}
