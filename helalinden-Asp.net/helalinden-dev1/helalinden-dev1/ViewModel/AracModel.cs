using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace helalinden_dev1.ViewModel
{
    public class AracModel
    {
        public int AracId { get; set; }
        public string AracAdi { get; set; }
        public int AracFiyat { get; set; }
        public string AracAciklama { get; set; }
        public int AracKatId { get; set; }
        public string AracKatAdi { get; set; }
    }
}