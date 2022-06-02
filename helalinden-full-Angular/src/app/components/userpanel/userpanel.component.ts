import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kira } from 'src/app/models/Kira';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KiraDialogComponent } from '../dialogs/kira-dialog/kira-dialog.component';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  kiralar:Kira[];
  UyeId:number;
  uye: Uye;
  dataSource:any;

  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route:ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p =>{
      if (p.UyeId) {
        this.UyeId = p.UyeId;
        this.UyeById()
        this.KiraListeByUyeId();

      }

    });
  }
  // KiraListele(kiradeneme:Kira){
  //   this.Uyetanımı= localStorage.getItem("uyeid");
  //   var uyedeger = this.Uyetanımı
  //   var uyenumberdeger = Number(uyedeger)
    
  //   this.apiServis.KiraListe().subscribe((d:Kira[])=>{
  //     this.kira=d;
  //     this.KiraUyeId=d;
  //     if(uyenumberdeger == kiradeneme.KiraUyeId ){
  //       console.log(uyenumberdeger)

  //       this.dataSource= new MatTableDataSource(d);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     }
      

  //   });
  // }


  // KiraListele(kiradeneme:Kira){
  //   var uyeid :number = parseInt(localStorage.getItem("uyeid"));

  //   console.log(uyeid)
    
  //   console.log(this.KiraUyeId)

  //   if(uyeid == this.KiraUyeId){
  //     this.apiServis.KiraListe().subscribe((d:Kira[])=>{
  //       this.kira=d;
  //       this.dataSource= new MatTableDataSource(d);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  
  //     });
  //   }

    
  // }
  
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
  

  


