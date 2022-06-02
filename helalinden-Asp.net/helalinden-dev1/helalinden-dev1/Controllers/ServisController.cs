using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using helalinden_dev1.Models;
using helalinden_dev1.ViewModel;

namespace helalinden_dev1.Controllers
{   
    

    public class ServisController : ApiController
    {
        DB01Entities1 db = new DB01Entities1();
        SonucModel sonuc = new SonucModel();

    
        #region Kategori
        [HttpGet]
        [Route("api/kategoriliste")]
        
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategoriler.Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAd = x.KategoriAd,
                KatAracSay = x.Araclar.Count()
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategoriler.Where(s => s.KategoriId == katId).Select(x => new KategoriModel()
        {
                KategoriId = x.KategoriId,
                KategoriAd = x.KategoriAd,
                KatAracSay = x.Araclar.Count()
            }).FirstOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategoriler.Count(s => s.KategoriAd == model.KategoriAd) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }
            Kategoriler yeni = new Kategoriler();
            yeni.KategoriAd = model.KategoriAd;
            db.Kategoriler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }


        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategoriler kayit = db.Kategoriler.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.KategoriAd = model.KategoriAd;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategoriler kayit = db.Kategoriler.Where(s => s.KategoriId == katId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Araclar.Count(s => s.AracKatId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Ürün Kaydı Olan Kategori Silinemez!";
                return sonuc;
            }
            db.Kategoriler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        #endregion

        #region Urun
        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.Araclar.Select(x => new AracModel()
            {
                AracId = x.AracId,
                AracAdi = x.AracAdi,
                AracKatId = x.AracKatId,
                AracKatAdi = x.Kategoriler.KategoriAd,
                AracFiyat = x.AracFiyat,
                AracAciklama = x.AracAciklama
                
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/araclistebykatid/{katId}")]
        public List<AracModel> AracListeByKatId(int katId)
        {
            List<AracModel> liste = db.Araclar.Where(s => s.AracKatId == katId).Select(x =>
           new AracModel()
           {
               AracId = x.AracId,
               AracAdi = x.AracAdi,
               AracFiyat = x.AracFiyat,
               AracAciklama = x.AracAciklama,
               AracKatId = x.AracKatId,
               AracKatAdi = x.Kategoriler.KategoriAd,
           }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(int aracId)
        {
            AracModel kayit = db.Araclar.Where(s => s.AracId == aracId).Select(x => new AracModel()
        {
                AracId = x.AracId,
                AracAdi = x.AracAdi,
                AracFiyat = x.AracFiyat,
                AracAciklama = x.AracAciklama,
                AracKatId = x.AracKatId,
                AracKatAdi = x.Kategoriler.KategoriAd             
            }).FirstOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkle(AracModel model)
        {
            if (db.Araclar.Count(s => s.AracAdi == model.AracAdi && s.AracKatId == model.AracKatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Arac İlgili Kategoride Kayıtlıdır!";
                return sonuc;
            }
            Araclar yeni = new Araclar();
            yeni.AracAdi = model.AracAdi;
            yeni.AracFiyat = model.AracFiyat;
            yeni.AracAciklama = model.AracAciklama;
            yeni.AracKatId = model.AracKatId;
            db.Araclar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AracModel model)
        {
            Araclar kayit = db.Araclar.Where(s => s.AracId == model.AracId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.AracAdi = model.AracAdi;
            kayit.AracFiyat = model.AracFiyat;
            kayit.AracKatId = model.AracKatId;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/aracsil/{aracId}")]
        public SonucModel AracSil(int aracId)
        {
            Araclar kayit = db.Araclar.Where(s => s.AracId == aracId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Araclar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Silindi";
            return sonuc;
        }
        #endregion

        #region Uye
        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uyeler.Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAdSoyad = x.UyeAdSoyad,
                UyeEposta = x.UyeEposta,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uyeler.Where(s => s.UyeId == uyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAdSoyad = x.UyeAdSoyad,
                UyeEposta = x.UyeEposta,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki
            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uyeler.Count(s => s.UyeAdSoyad == model.UyeAdSoyad || s.UyeEposta == model.UyeEposta) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen İsim veya E-Posta Adresi Kayıtlıdır!";
                return sonuc;
            }
            Uyeler yeni = new Uyeler();
            yeni.UyeAdSoyad = model.UyeAdSoyad;
            yeni.UyeEposta = model.UyeEposta;
            yeni.UyeParola = model.UyeParola;
            yeni.UyeYetki = model.UyeYetki;
            db.Uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.UyeAdSoyad = model.UyeAdSoyad;
            kayit.UyeEposta = model.UyeEposta;
            kayit.UyeParola = model.UyeParola;
            kayit.UyeYetki = model.UyeYetki;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (db.Kiralama.Count(s => s.KiraId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Makale Kaydı Olan Üye Silinemez!";
                return sonuc;
            }
            db.Uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        #endregion



        #region Kiralama
        [HttpGet]
        [Route("api/kiraliste")]
        public List<KiraModel> KiraListe()
        {
            List<KiraModel> liste = db.Kiralama.Select(x => new KiraModel()
            {
                KiraId = x.KiraId,
                KiraTarih = x.KiraTarih,
                KiraSure = x.KiraSure,
                KiraUyeId = x.KiraUyeId,
                KiraUcret = x.KiraUcret,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kiralistebyuyeid/{uyeId}")]
        public List<KiraModel> KiraListeByUyeId(int uyeId)
        {
            List<KiraModel> liste = db.Kiralama.Where(s => s.KiraUyeId == uyeId).Select(x => new KiraModel()
        {
                KiraId = x.KiraId,
                KiraTarih = x.KiraTarih,
                KiraSure = x.KiraSure,
                KiraUyeId = x.KiraUyeId,
                KiraUcret = x.KiraUcret,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kiralistebykiraid/{kiralamaId}")]
        public List<KiraModel> KiraListeBymakaleId(int kiralamaId)
        {
            List<KiraModel> liste = db.Kiralama.Where(s => s.KiraId == kiralamaId).Select(
           x => new KiraModel()
           {
               KiraId = x.KiraId,
               KiraTarih = x.KiraTarih,
               KiraSure = x.KiraSure,
               KiraUyeId = x.KiraUyeId,
               KiraUcret = x.KiraUcret,
           }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kirabyid/{kiralamaId}")]
        public KiraModel KiraById(int kiralamaId)
        {
            KiraModel kayit = db.Kiralama.Where(s => s.KiraId == kiralamaId).Select(x => new KiraModel()
            {
                KiraId = x.KiraId,
                KiraTarih = x.KiraTarih,
                KiraSure = x.KiraSure,
                KiraUyeId = x.KiraUyeId,
                KiraUcret = x.KiraUcret,
            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/kiraekle")]
        public SonucModel KiraEkle(KiraModel model)
        {
            if (db.Kiralama.Count(s => s.KiraId == model.KiraId && s.KiraUyeId == model.KiraUyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Aracı Kiralayamaz!";
                return sonuc;
            }
            Kiralama yeni = new Kiralama();
            yeni.KiraUyeId = model.KiraUyeId;
            yeni.KiraTarih = model.KiraTarih;
            yeni.KiraSure = model.KiraSure;
            yeni.KiraUcret = model.KiraUcret;
            db.Kiralama.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Aracınız Başarıyla Kiralandı";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kiraduzenle")]
        public SonucModel KiraDuzenle(KiraModel model)
        {
            Kiralama kayit = db.Kiralama.Where(s => s.KiraId == model.KiraId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kira Bulunamadı!";
                return sonuc;
            }
            kayit.KiraId = model.KiraId;
            kayit.KiraTarih = model.KiraTarih;
            kayit.KiraSure = model.KiraSure;
            kayit.KiraUyeId = model.KiraUyeId;
            kayit.KiraUcret = model.KiraUcret;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kira Düzenlendi";
            return sonuc;


            
        }

        [HttpDelete]
        [Route("api/kirasil/{kiralamaId}")]
        public SonucModel KiraSil(int kiralamaId)
        {
            Kiralama kayit = db.Kiralama.Where(s => s.KiraId == kiralamaId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kira Bulunamadı!";
                return sonuc;
            }
            db.Kiralama.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kira Silindi";
            return sonuc;
        }
        #endregion


    }



}
