export class ReportPayment {
  vehicleId: number;
  vehicleName: string;
  fuel: any[];
  service: any[];
  parts: any[];
  insurance: any[];
  tax: any[];
  yearlySum: number;
  quarterlySum: any[];

  constructor(
    vehicleId?: number,
    vehicleName?: string,
    fuel?: any[],
    service?: any[], parts?: any[],
    insurance?: any[], tax?: any[],
    yearlySum?: number, quarterlySum?: any[]
  ) {
    this.vehicleId = vehicleId;
    this.vehicleName = vehicleName;
    this.fuel = fuel || [];
    this.service = service || [];
    this.parts = parts || [];
    this.insurance = insurance || [];
    this.tax = tax || [];
    this.yearlySum = yearlySum;
    this.quarterlySum = quarterlySum || [];
  }
}
