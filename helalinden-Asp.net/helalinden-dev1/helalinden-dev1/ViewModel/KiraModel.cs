using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace helalinden_dev1.ViewModel
{
    public class KiraModel
    {
        public int KiraId { get; set; }
        public System.DateTime KiraTarih { get; set; }
        public string KiraSure { get; set; }
        public int KiraUyeId { get; set; }
        public int KiraUcret { get; set; }
    }
}