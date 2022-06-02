import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Kira } from 'src/app/models/Kira';

@Component({
  selector: 'app-kirasayfa',
  templateUrl: './kirasayfa.component.html',
  styleUrls: ['./kirasayfa.component.scss']
})
export class KirasayfaComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dialogBaslik:string;
  yeniKayit:Kira;
  islem:string;
  frm:FormGroup;
  constructor(private _formBuilder: FormBuilder,
    
    ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 1) + 'gün';
    }

    return value;
  }

  
  

}
