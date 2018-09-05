export class Vehicle {
  id: number;
  registration: string;
  mark: string;
  acquisitionDay: string;
  prise: number;
  resaleValue: number;

  constructor(id?: number, registration?: string, mark?: string, acquisitionDay?: string, prise?: number, resaleValue?: number) {
    this.id = id;
    this.registration = registration;
    this.mark = mark;
    this.acquisitionDay = acquisitionDay;
    this.prise = prise;
    this.resaleValue = resaleValue;
  }
}
