export class Payment {
  id: number;
  day: string;
  kilometers: number;
  fuel: number;
  service: number;
  parts: number;
  insurance: number;
  tax: number;
  comment: string;
  vehicleId: number;

  constructor(id?: number, day?: string, kilometers?: number,
              fuel?: number,
              service?: number, parts?: number,
              insurance?: number, tax?: number,
              comment?: string,
              vehicleId?: number) {
    this.id = id;
    this.day = day;
    this.kilometers = kilometers;
    this.fuel = fuel;
    this.service = service;
    this.parts = parts;
    this.insurance = insurance;
    this.tax = tax;
    this.comment = comment;
    this.vehicleId = vehicleId;
  }
}
