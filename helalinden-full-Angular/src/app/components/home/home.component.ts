import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public alert:MyAlertService,
    public  matDialog : MatDialog,
    public apiServis:ApiService,
  ) { }

  ngOnInit() {
  }
  AlertAc(p:boolean){
    var s:Sonuc = new Sonuc();
    s.islem = p;
    s.mesaj = "Alert Mesajıdır";
    this.alert.AlertUygula(s)
  }
  ConfirmAc(){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor Musunuz ";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d)
      if(d){
        //silme 
      }
    });
  }

}
