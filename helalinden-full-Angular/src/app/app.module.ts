import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AracComponent } from './components/arac/arac.component';
import { UyeComponent } from './components/uye/uye.component';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCommonModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { AdminAracComponent } from './components/admin/admin-arac/admin-arac.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminKiraComponent } from './components/admin/admin-kira/admin-kira.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule} from '@angular/material/table';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AracDialogComponent } from './components/dialogs/arac-dialog/arac-dialog.component';
import { KiraDialogComponent } from './components/dialogs/kira-dialog/kira-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { JoditAngularModule } from 'jodit-angular';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { KirasayfaComponent } from './components/kirasayfa/kirasayfa.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserpanelComponent } from './components/userpanel/userpanel.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AracComponent,
    UyeComponent,
    LoginComponent,
    

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AracDialogComponent,
    KiraDialogComponent,
    UyeDialogComponent,
    

    //admin
    AdminAracComponent,
    AdminKategoriComponent,
    AdminKiraComponent,
    AdminPanelComponent,
    AdminUyeComponent,
    UserpanelComponent,
    KirasayfaComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    JoditAngularModule,
    MatBadgeModule,
    MatSliderModule,
    MatCardModule,
    MatGridListModule,
    MatStepperModule,
    MatDialogModule,
    
    
    
    
    
    
    
    
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AracDialogComponent,
    KiraDialogComponent,
    UyeDialogComponent
  ],
  providers: [MyAlertService,ApiService,AuthGuard,
    { provide : HTTP_INTERCEPTORS , useClass : AuthInterceptor, multi : true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
