import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arac } from '../models/Arac';
import { Kategori } from '../models/Kategori';
import { Kira } from '../models/Kira';
import { Uye } from '../models/Uye';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:52015/api/";
  constructor(
    public http : HttpClient
  ) { }

  tokenAl(UyeMail: string, Uyeparola: string){
    var data = "username=" + UyeMail + "&password=" + Uyeparola + "&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl + "token", data, { headers: reqHeader});
  
  }
  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  yetkiKontrol(yetkiler){
    var sonuc : boolean = false;

    var uyeYetkiler :string[] = JSON.parse(localStorage.getItem("uyeYetki"))

    if(uyeYetkiler){
      yetkiler.forEach(element => {
        if(uyeYetkiler.indexOf(element)>-1){
          sonuc = true;
          return false;

        }
      });
    }

    return sonuc;
  }



  
  KategoriListe(){
    return this.http.get(this.apiUrl+ "/kategoriliste");
  }
  KategoriById(KategoriId:number){
    return this.http.get(this.apiUrl+ "/kategoribyid/"+ KategoriId);
  }
  KategoriEkle(kat:Kategori){
    return this.http.post(this.apiUrl+ "/kategoriekle",kat);
    
  }
  KategoriDuzenle(kat:Kategori){
    return this.http.put(this.apiUrl+ "/kategoriduzenle",kat);
  }
  KategoriSil(KategoriId:number){
    return this.http.delete(this.apiUrl+ "/kategorisil/"+KategoriId);
  }


  AracListe(){
    return this.http.get(this.apiUrl+"/aracliste")
  }
  AracListeByKatId(AracId:number){
    return this.http.get(this.apiUrl+"/araclistebykatid/"+AracId)
  }
  AracEkle(arc:Arac){
    return this.http.post(this.apiUrl+"/aracekle",arc)
  }
  AracDuzenle(arc:Arac){
    return this.http.put(this.apiUrl+"/aracduzenle",arc)
  }
  AracById(AracId:number){
    return this.http.get(this.apiUrl+"/aracbyıd/"+AracId)
  }
  AracSil(AracId:number){
    return this.http.delete(this.apiUrl+"/aracsil/"+AracId)
  }

  

  KiraListe(){
    return this.http.get(this.apiUrl+ "/kiraliste")
  }
  KiraById(KiraId:number){
    return this.http.get(this.apiUrl+ "/kirabyid/"+KiraId)
  }
  KiraListeByKiraId(KiraId:number){
    return this.http.get(this.apiUrl+ "/kiralistebykiraid/"+KiraId)
  }
  KiraListeByUyeId(UyeId:number){
    return this.http.get(this.apiUrl+ "/kiralistebyuyeid/"+UyeId)
  }
  KiraEkle(kira:Kira){
    return this.http.post(this.apiUrl+ "/kiraekle",kira)
  }
  KiraDuzenle(kira:Kira){
    return this.http.put(this.apiUrl+ "/kiraduzenle",kira)
  }
  KiraSil(KiraId:number){
    return this.http.delete(this.apiUrl+ "/kirasil/"+KiraId)
  }


  UyeListe(){
    return this.http.get(this.apiUrl+ "/uyeliste")
  }
  UyeById(UyeId:number){
    return this.http.get(this.apiUrl+ "/uyebyid/" + UyeId)
  }
  UyeEkle(uye:Uye){
    return this.http.post(this.apiUrl+ "/uyeekle",uye)
  }
  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+ "/uyeduzenle",uye)
  }
  UyeSil(UyeId:number){
    return this.http.delete(this.apiUrl+ "/uyesil/" + UyeId)
  }
  




  















  


  


}
