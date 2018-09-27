import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year: any;

  constructor(private router: Router) {
    this.year = new Date().getFullYear();
  }

  createNewVehicle(): void {
    this.router.navigate(['/vehicles/new']);
  }

  report(): void {
    this.router.navigate(['/reports/' + this.year]);
  }
}
