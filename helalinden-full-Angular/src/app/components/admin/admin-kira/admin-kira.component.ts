import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kira } from 'src/app/models/Kira';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KiraDialogComponent } from '../../dialogs/kira-dialog/kira-dialog.component';

@Component({
  selector: 'app-admin-kira',
  templateUrl: './admin-kira.component.html',
  styleUrls: ['./admin-kira.component.scss']
})
export class AdminKiraComponent implements OnInit {
  kira:Kira[];
  dataSource:any;
  UyeId:number;
  uye: Uye;
  kiralar:Kira[];
  displayedColumns=['KiraTarih','KiraSure','KiraUyeId','KiraUcret','detay']
  dialogRef:MatDialogRef<KiraDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.KiraListele();
    this.route.params.subscribe(p =>{
      if (p.UyeId) {
        this.UyeId = p.UyeId;
        this.UyeById();
        this.KiraListeByUyeId();
        

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
  Duzenle(kira:Kira){
    this.dialogRef=this.matDialog.open(KiraDialogComponent,{
      width:'400px',
      data:{
        kayit: kira,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
        
        kira.KiraSure= d.KiraSure;
        kira.KiraUyeId= d.KiraUyeId;
        kira.KiraUcret= d.KiraUcret;
      this.apiServis.KiraDuzenle(kira).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.KiraListele();
        }
      });
    } 
    });
  }


  Sil(kira:Kira){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kira.KiraId + " Adlı kira silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){

        kira.KiraTarih = d.KiraTarih;
        kira.KiraSure= d.KiraSure;
        kira.KiraUyeId= d.KiraUyeId;
        kira.KiraUcret= d.KiraUcret;

        this.apiServis.KiraSil(kira.KiraId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KiraListele();
          }
        });
      } 
    
    });
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
        
        yeniKayit.KiraUyeId= d.KiraUyeId;
        yeniKayit.KiraTarih = d.KiraTarih;
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

  UyeById(){
    this.apiServis.UyeById(this.UyeId).subscribe((d: Uye)=>{
      this.uye = d;
    });
  }

  KiraListeByUyeId(){
    this.apiServis.KiraListeByUyeId(this.UyeId).subscribe((d:Kira[])=>{
      this.kiralar= d
      console.log(d)

    });
  }

}
