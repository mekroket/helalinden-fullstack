import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { AracDialogComponent } from '../../dialogs/arac-dialog/arac-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-arac',
  templateUrl: './admin-arac.component.html',
  styleUrls: ['./admin-arac.component.scss']
})
export class AdminAracComponent implements OnInit {
  araclar:Arac[];
  kategoriler:Kategori[];
  KategoriId:number;
  dataSource:any;
  displayedColumns=['AracKatId','AracAdi','AracFiyat','AracAciklama','AracKatAdi','detay']
  dialogRef:MatDialogRef<AracDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.route.params.subscribe(p=>{
      
      if(p.KategoriId){
        this.KategoriId = p.KategoriId;
        this.AracListele();
      
      }
      
    });
  }

  AracListele(){
    this.apiServis.AracListeByKatId(this.KategoriId).subscribe((d:Arac[])=>{
      this.araclar=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      

    });
  }

  KategoriSec(kat:Kategori){
    this.KategoriId = kat.KategoriId;
    console.log(this.KategoriId)
    this.AracListele();
    
  }



  Duzenle(araclar:Arac){
    this.dialogRef=this.matDialog.open(AracDialogComponent,{
      width:'1000px',
      data:{
        kayit: araclar,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      araclar.AracAdi = d.AracAdi;
      araclar.AracFiyat = d.AracFiyat;
      araclar.AracAciklama = d.AracAciklama;
      araclar.AracKatId = d.AracKatId;
      this.apiServis.AracDuzenle(araclar).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.AracListele();
        }
      });
    } 
    });
  }

  Detay(araclar:Arac){
    this.dialogRef=this.matDialog.open(AracDialogComponent,{
      width:'1000px',
      data:{
        kayit: araclar,
        islem:'detay'
      }
  });
  
  }
  
  
  
  Ekle(){
    var yeniKayit:Arac = new Arac();
    this.dialogRef=this.matDialog.open(AracDialogComponent,{
      width:'1000px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        yeniKayit.AracAdi= d.AracAdi;
        yeniKayit.AracKatId = d.AracKatId;
        this.apiServis.AracEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.AracListele();
          }
        });
      }
    });
  }


  Sil(araclar:Arac){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = araclar.AracAdi + " Adlı araç silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){

        araclar.AracAdi = d.AracAdi;
        araclar.AracFiyat = d.AracFiyat;
        araclar.AracAciklama = d.AracAciklama;
        araclar.AracKatId = d.AracKatId;

        this.apiServis.AracSil(araclar.AracId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.AracListele();
          }
        });
      } 
    
    });
  }


}
