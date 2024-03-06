using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class ReservationTime
    {
        public DateTime Date { get; set; }
        public string? Time1 { get; set; }
        public string? Time2 { get; set; }
        public string? Time3 { get; set; }
        public string? Time4 { get; set; }
        public bool Status { get; set; }
    }
}
