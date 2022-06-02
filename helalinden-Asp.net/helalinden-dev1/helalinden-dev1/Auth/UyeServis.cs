using helalinden_dev1.Models;
using helalinden_dev1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace helalinden_dev1.Auth
{
    public class UyeServis
    {
        DB01Entities1 db = new DB01Entities1();
        public UyeModel UyeOturumAc(string UyeEposta, string UyeParola)
        {
            UyeModel uye = db.Uyeler.Where(s => s.UyeEposta == UyeEposta && s.UyeParola == UyeParola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAdSoyad = x.UyeAdSoyad,
                UyeEposta = x.UyeEposta,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki
            }).SingleOrDefault();
            return uye;

        }
    }
}