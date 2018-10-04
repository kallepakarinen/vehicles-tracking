import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import {Vehicle} from '../Vehicle';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleHttpService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiEndpointUrl + '/vehicles';
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get(this.url).pipe(map(response => {
      return response as Vehicle[];
    }));
  }

  getById(id): Observable<Vehicle> {
    return this.httpClient.get(this.url + '/' + id).pipe(map(response => {
      return response as Vehicle;
    }));
  }

  post(vehicle): Observable<Vehicle> {
    return this.httpClient.post(this.url, vehicle).pipe(map(response => {
      return response as Vehicle;
    }));
  }

  put(vehicle): Observable<Vehicle> {
    console.log(this.url + '/' + vehicle.id);
    return this.httpClient.put(this.url + '/' + vehicle.id, vehicle).pipe(map(response => {
      console.log(response);
      return response as Vehicle;
    }));
  }
}


