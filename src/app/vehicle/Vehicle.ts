export class Vehicle {
  id: number;
  registration: string;
  mark: string;
  acquisitionDay: string;
  price: number;
  resaleValue: number;
  active: boolean;

  constructor(id?: number, registration?: string, mark?: string,
              acquisitionDay?: string, price?: number, resaleValue?: number, active?: boolean) {
    this.id = id;
    this.registration = registration;
    this.mark = mark;
    this.acquisitionDay = acquisitionDay;
    this.price = price;
    this.resaleValue = resaleValue;
    this.active = active;
  }
}
