using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Payment
    {
        public Payment()
        {
            RealEstates = new HashSet<RealEstate>();
        }

        public int Id { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public bool Status { get; set; }

        public virtual ICollection<RealEstate> RealEstates { get; set; }
    }
}
