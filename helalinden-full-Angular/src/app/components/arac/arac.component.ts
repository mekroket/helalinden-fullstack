import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { Kira } from 'src/app/models/Kira';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KiraDialogComponent } from '../dialogs/kira-dialog/kira-dialog.component';

@Component({
  selector: 'app-arac',
  templateUrl: './arac.component.html',
  styleUrls: ['./arac.component.css']
})
export class AracComponent implements OnInit {
  araclar:Arac[];
  kira:Kira[];
  dataSource:any;
  kategoriler:Kategori[];
  KategoriId:number;
  displayedColumns=['KiraTarih','KiraSure','KiraUyeId','KiraUcret','detay']
  dialogRef:MatDialogRef<KiraDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(
    public  apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route : ActivatedRoute

  ) { }

  ngOnInit() {
    this.AracListe();
    this.KiraListele();
    this.KategoriListele();
  }

  AracListe(){
    this.apiServis.AracListe().subscribe((d:Arac[])=>{
      this.araclar=d;
      console.log(d)
    });
  }

  Araclar(){
    this.apiServis.AracListe().subscribe((d:Arac[])=>{
      this.araclar;
    })
  }


  Ekle(){
    var yeniKayit:Kira = new Kira();
    this.dialogRef=this.matDialog.open(KiraDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
        yeniKayit.KiraTarih = d.KiraTarih;
        yeniKayit.KiraUyeId= d.KiraUyeId;
        yeniKayit.KiraUcret= d.KiraUcret;
        yeniKayit.KiraSure= d.KiraSure;
        console.log(d.KiraUyeId)
        
      
        this.apiServis.KiraEkle(d).subscribe((s:Sonuc)=>{
          console.log(d.KiraUyeId)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KiraListele();
          }
        });
      }
    });
  }


  KiraListele(){
    this.apiServis.KiraListe().subscribe((d:Kira[])=>{
      this.kira=d;
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

}

