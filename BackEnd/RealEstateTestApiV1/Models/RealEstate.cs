using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class RealEstate
    {
        public RealEstate()
        {
            RealEstateImages = new HashSet<RealEstateImage>();
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string? FirebaseId { get; set; }
        public int InvestorId { get; set; }
        public int PayId { get; set; }
        public int LocationId { get; set; }
        public int DirectId { get; set; }
        public string RealestateName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public int? RoomNumber { get; set; }
        public string? Length { get; set; }
        public string? Width { get; set; }
        public string? Perimeter { get; set; }
        public string? Area { get; set; }
        public string? LegalStatus { get; set; }
        public string? Price { get; set; }
        public string? Discount { get; set; }
        public string? Discription { get; set; }
        public int Status { get; set; }

        public virtual Direct Direct { get; set; } = null!;
        public virtual Account Investor { get; set; } = null!;
        public virtual Location Location { get; set; } = null!;
        public virtual Payment Pay { get; set; } = null!;
        public virtual ICollection<RealEstateImage> RealEstateImages { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
