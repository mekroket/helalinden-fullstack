import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {
  uyeler:Uye[];
  constructor(
    public  apiServis:ApiService
  ) { }

  ngOnInit() {
  }
  

}
