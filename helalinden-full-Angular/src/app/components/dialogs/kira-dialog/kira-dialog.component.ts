import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kira } from 'src/app/models/Kira';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';



@Component({
  selector: 'app-kira-dialog',
  templateUrl: './kira-dialog.component.html',
  styleUrls: ['./kira-dialog.component.scss']
})
export class KiraDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Kira;
  islem:string;
  frm:FormGroup;
  uye:Uye[];
  paginator: any;
  dataSource:any;
  @ViewChild(MatSort) sort : MatSort; 
  uyeid:string;
  hide = true;

  

  

  constructor(
    public dialogRef: MatDialogRef<KiraDialogComponent>,
    public frmBuild :FormBuilder,
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    @Inject(MAT_DIALOG_DATA) public data :any
  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Aracı Kirala";
      this.yeniKayit = new Kira();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Kira Duzenle"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
    this.UyeListele();
    if(this.apiServis.oturumKontrol){
      this.uyeid= localStorage.getItem("uyeid");
    }
  }

  FormOlustur(){
    return this.frmBuild.group({
      KiraUyeId: [this.yeniKayit.KiraUyeId],
      KiraTarih: [this.yeniKayit.KiraTarih],
      KiraSure:  [this.yeniKayit.KiraSure],
      KiraUcret: [this.yeniKayit.KiraUcret]
    })
  };

  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 1) + 'gün';
    }

    return value;
  }

  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uye=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

}
