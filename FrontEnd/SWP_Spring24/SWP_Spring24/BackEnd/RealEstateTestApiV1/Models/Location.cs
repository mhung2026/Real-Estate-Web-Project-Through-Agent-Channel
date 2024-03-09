using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Location
    {
        public Location()
        {
            RealEstates = new HashSet<RealEstate>();
        }

        public int Id { get; set; }
        public string Ward { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public bool Status { get; set; }

        public virtual ICollection<RealEstate> RealEstates { get; set; }
    }
}
