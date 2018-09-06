import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatSortModule,
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
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule
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
