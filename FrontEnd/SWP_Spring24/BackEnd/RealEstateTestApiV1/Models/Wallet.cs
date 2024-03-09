using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Wallet
    {
        public Wallet()
        {
            WalletHistories = new HashSet<WalletHistory>();
        }

        public int Id { get; set; }
        public int InvestorId { get; set; }
        public string? AccountBalance { get; set; }
        public DateTime WalletCreateAt { get; set; }
        public bool Status { get; set; }

        public virtual Account Investor { get; set; } = null!;
        public virtual ICollection<WalletHistory> WalletHistories { get; set; }
    }
}
