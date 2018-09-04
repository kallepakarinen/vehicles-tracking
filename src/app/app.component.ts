import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
  }

  createNewVehicle(): void {
    this.router.navigate(['/vehicles/new']);
  }

  report(): void {
    this.router.navigate(['/reports']);
  }
}
