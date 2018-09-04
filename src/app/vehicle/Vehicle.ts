export class Vehicle {
  id: number;
  registration: string;
  mark: string;
  acquisitionDay: string;
  prise: string;

  constructor(id?: number, registration?: string, mark?: string, acquisitionDay?: string, prise?: string) {
    this.id = id;
    this.registration = registration;
    this.mark = mark;
    this.acquisitionDay = acquisitionDay;
    this.prise = prise;
  }
}
