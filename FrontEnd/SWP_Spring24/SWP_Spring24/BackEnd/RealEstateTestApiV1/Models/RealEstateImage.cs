using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class RealEstateImage
    {
        public int Id { get; set; }
        public int RealEstateId { get; set; }
        public string? ImageName { get; set; }
        public string ImageUrl { get; set; } = null!;
        public bool Status { get; set; }

        public virtual RealEstate RealEstate { get; set; } = null!;
    }
}
