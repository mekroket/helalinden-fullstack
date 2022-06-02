import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Uye;
  islem:string;
  frm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild :FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any,
    public apiServis:ApiService,
  ) { 
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Kayıt Ol";
      this.yeniKayit = new Uye();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Uye Duzenle"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      UyeAdSoyad: [this.yeniKayit.UyeAdSoyad],
      UyeEposta:  [this.yeniKayit.UyeEposta],
      UyeParola: [this.yeniKayit.UyeParola],
      UyeYetki: [this.yeniKayit.UyeYetki]
    })
  };

}
