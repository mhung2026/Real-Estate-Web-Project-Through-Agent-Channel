using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Reservation
    {
        public int Id { get; set; }
        public int RealEstateId { get; set; }
        public int? CustomerId { get; set; }
        public int? AgencyId { get; set; }
        public DateTime? BookingDate { get; set; }
        public string? BookingTime { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int Status { get; set; }

        public virtual Account? Customer { get; set; }
        public virtual RealEstate RealEstate { get; set; } = null!;
    }
}
