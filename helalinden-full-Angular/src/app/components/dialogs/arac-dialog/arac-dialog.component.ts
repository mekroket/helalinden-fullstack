import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { KategoriDialogComponent } from '../kategori-dialog/kategori-dialog.component';

@Component({
  selector: 'app-arac-dialog',
  templateUrl: './arac-dialog.component.html',
  styleUrls: ['./arac-dialog.component.scss']
})
export class AracDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Arac;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];
  Jconfig = {};
  constructor(
    public dialogRef: MatDialogRef<AracDialogComponent>,
    public frmBuild :FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any,
    public apiServis : ApiService
  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Arac Ekle";
      this.yeniKayit = new Arac();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Arac Duzenle"
      this.yeniKayit = data.kayit;

    }
    if(this.islem=="detay"){
      this.dialogBaslik="Arac Detay"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListele();
  }

  FormOlustur(){
    return this.frmBuild.group({
      AracAdi: [this.yeniKayit.AracAdi],
      AracFiyat: [this.yeniKayit.AracFiyat],
      AracAciklama: [this.yeniKayit.AracAciklama],
      AracKatId: [this.yeniKayit.AracKatId],
    })
  };

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      

    });
  }

}
