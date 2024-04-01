using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class PostingPrice
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public DateTime CreateAt { get; set; }
        public bool Status { get; set; }
    }
}
