import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCommonModule, MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { matSelectAnimations, MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';















const MatModuller = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCommonModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  BrowserAnimationsModule,
  MatSliderModule,
  MatCardModule,
  MatGridListModule,
  MatStepperModule,
  
  
  
  
  
  
  
  
  
  
];

@NgModule({
  imports: [MatModuller],
  exports: [MatModuller]
})
export class MaterialModule { }
