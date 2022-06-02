import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';
import { Uye } from 'src/app/models/Uye';
import { ActivatedRoute } from '@angular/router';
import { Kira } from 'src/app/models/Kira';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  uyeAdSoyad:string;
  kategoriler:Kategori[];
  UyeId = localStorage.getItem("uyeid")
  uye: Uye;
  kiralar:Kira[];

  uyeler:Uye[];
  dataSource:any;
  displayedColumns=['UyeId','UyeAdSoyad','UyeEposta','UyeParola','UyeYetki','detay']
  dialogRef:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis:ApiService,
    public route:ActivatedRoute,
    public matDialog : MatDialog,
    public alert: MyAlertService
  
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    if(this.apiServis.oturumKontrol){
      this.uyeAdSoyad= localStorage.getItem("uyeAdSoyad");
    }
    this.UyeListele();

    
  }
  OturumKapat(){
    localStorage.clear();
    location.href="/";
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      
    });
  }


  Ekle(){
    var yeniKayit:Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
        
        yeniKayit.UyeYetki= d.UyeYetki;
      
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uyeler=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  

  
  

}
