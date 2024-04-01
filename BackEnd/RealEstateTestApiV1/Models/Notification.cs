using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Notification
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; } = null!;
        public DateTime CreateAt { get; set; }
        public bool Status { get; set; }

        public virtual Account Account { get; set; } = null!;
    }
}
