import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const materialModules = [
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatDatepickerModule,
  BrowserAnimationsModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSortModule,
  MatTooltipModule,
  MatSelectModule
];

@NgModule({
  imports: [
    materialModules
  ],
  exports: [
    materialModules
  ]
})
export class MaterialComponentsModule {
}
