import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';

@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.scss']
})
export class AdminKategoriComponent implements OnInit {
kategoriler:Kategori[];
dataSource:any;
displayedColumns=['KategoriId','KategoriAd','KatAracSay','detay']
dialogRef:MatDialogRef<KategoriDialogComponent>
dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
@ViewChild(MatSort) sort : MatSort; 
@ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KategoriListele()
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }


  Ekle(){
    var yeniKayit:Kategori = new Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        yeniKayit.KategoriAd= d.KategoriAd;
        console.log(d)
        this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }




  Duzenle(kayit:Kategori){
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      kayit.KategoriAd = d.KategoriAd;
      this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.KategoriListele();
        }
      });
    } 
    });
  }


  
  Sil(kayit:Kategori){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.KategoriAd + " Adlı kategori silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){
        kayit.KategoriAd = d.KatAd;
        this.apiServis.KategoriSil(kayit.KategoriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      } 
    
    });
  }

}
