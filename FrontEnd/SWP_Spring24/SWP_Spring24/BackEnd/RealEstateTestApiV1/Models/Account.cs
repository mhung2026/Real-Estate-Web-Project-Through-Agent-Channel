using System;
using System.Collections.Generic;

namespace RealEstateTestApi.Models
{
    public partial class Account
    {
        public Account()
        {
            RealEstates = new HashSet<RealEstate>();
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public bool Status { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual Wallet? Wallet { get; set; }
        public virtual ICollection<RealEstate> RealEstates { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
