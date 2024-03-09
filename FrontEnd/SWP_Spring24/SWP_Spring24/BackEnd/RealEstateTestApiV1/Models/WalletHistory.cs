using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class WalletHistory
    {
        public int Id { get; set; }
        public int WalletId { get; set; }
        public string Description { get; set; } = null!;
        public DateTime CreateAt { get; set; }

        public virtual Wallet Wallet { get; set; } = null!;
    }
}
