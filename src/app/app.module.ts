import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {VehicleListComponent} from './vehicle/vehicle-list/vehicle-list.component';
import {VehiclesComponent} from './vehicle/vehicle-detail/vehicles.component';
import {HttpClientModule} from '@angular/common/http';
import {VehicleHttpService} from './vehicle/services/vehicle-http.service';
import {MaterialComponentsModule} from './vehicle/ui/material-components/material-components.module';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PaymentListComponent} from './vehicle/payment-list/payment-list.component';
import {PaymentHttpService} from './vehicle/services/payment-http.service';

import {PaysComponent} from './vehicle/pays/pays.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaymentService} from './vehicle/services/payment.service';
import {AllPaymentsComponent} from './vehicle/payment-reports/all-payments/all-payments.component';
import {ReportHttpService} from './vehicle/payment-reports/report-services/report-http.service';
import {CovalentLayoutModule} from '@covalent/core';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from './vehicle/services/local-storage.service';
import {DateFormatPipe} from './vehicle/pipes/date-format.pipe';
import { NotificationDialogComponent } from './vehicle/notifications/notification-dialog/notification-dialog.component';
import { NotificationSnackbarComponent } from './vehicle/notifications/notification-snackbar/notification-snackbar.component';
import { ToolbarComponent } from './vehicle/ui/toolbar/toolbar.component';
import {ToolbarService} from './vehicle/ui/toolbar/toolbar.service';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { InfoComponent } from './vehicle/info/info.component';


const appRoutes: Routes = [
  {path: 'vehicles', component: VehicleListComponent},
  {path: 'vehicles/new', component: VehiclesComponent},
  {path: 'vehicles/:id', component: VehiclesComponent},
  {path: 'payments/:id', component: PaymentListComponent},
  {path: 'pays/:id', component: PaysComponent},
  {path: 'pays/new/:vehicle', component: PaysComponent},
  {path: 'reports/:year', component: AllPaymentsComponent},
  {path: '', redirectTo: '/vehicles', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleListComponent,
    PaymentListComponent,
    PaysComponent,
    AllPaymentsComponent,
    DateFormatPipe,
    NotificationDialogComponent,
    NotificationSnackbarComponent,
    ToolbarComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialComponentsModule,
    FormsModule,
    FlexLayoutModule,
    CovalentLayoutModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    NgxChartsModule
  ],
  providers: [VehicleHttpService, PaymentService, PaymentHttpService, ReportHttpService, LocalStorageService, ToolbarService],
  bootstrap: [AppComponent],
  entryComponents: [NotificationDialogComponent, NotificationSnackbarComponent]
})
export class AppModule {
}
