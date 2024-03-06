using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Data
{
    public partial class SWPRealEstateContext : DbContext
    {
        public SWPRealEstateContext()
        {
        }

        public SWPRealEstateContext(DbContextOptions<SWPRealEstateContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Direct> Directs { get; set; } = null!;
        public virtual DbSet<Location> Locations { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<RealEstate> RealEstates { get; set; } = null!;
        public virtual DbSet<RealEstateImage> RealEstateImages { get; set; } = null!;
        public virtual DbSet<Reservation> Reservations { get; set; } = null!;
        public virtual DbSet<ReservationTime> ReservationTimes { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Wallet> Wallets { get; set; } = null!;
        public virtual DbSet<WalletHistory> WalletHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=RealEstateDB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .HasColumnName("address");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("date")
                    .HasColumnName("create_at");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .HasColumnName("phone_number");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.UpdateAt)
                    .HasColumnType("date")
                    .HasColumnName("update_at");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Account_Role");
            });

            modelBuilder.Entity<Direct>(entity =>
            {
                entity.ToTable("Direct");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DirectName)
                    .HasMaxLength(50)
                    .HasColumnName("direct_name");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .HasColumnName("city");

                entity.Property(e => e.District)
                    .HasMaxLength(50)
                    .HasColumnName("district");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Ward)
                    .HasMaxLength(50)
                    .HasColumnName("ward");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(50)
                    .HasColumnName("payment_method");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<RealEstate>(entity =>
            {
                entity.ToTable("RealEstate");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Area)
                    .HasMaxLength(50)
                    .HasColumnName("area");

                entity.Property(e => e.DirectId).HasColumnName("direct_id");

                entity.Property(e => e.Discount)
                    .HasMaxLength(10)
                    .HasColumnName("discount");

                entity.Property(e => e.Discription)
                    .HasMaxLength(500)
                    .HasColumnName("discription");

                entity.Property(e => e.FirebaseId).HasColumnName("firebase_id");

                entity.Property(e => e.InvestorId).HasColumnName("investor_id");

                entity.Property(e => e.LegalStatus)
                    .HasMaxLength(50)
                    .HasColumnName("legal_status");

                entity.Property(e => e.Length)
                    .HasMaxLength(50)
                    .HasColumnName("length");

                entity.Property(e => e.LocationId).HasColumnName("location_id");

                entity.Property(e => e.PayId).HasColumnName("pay_id");

                entity.Property(e => e.Perimeter)
                    .HasMaxLength(50)
                    .HasColumnName("perimeter");

                entity.Property(e => e.Price)
                    .HasMaxLength(50)
                    .HasColumnName("price");

                entity.Property(e => e.RealestateName)
                    .HasMaxLength(50)
                    .HasColumnName("realestate_name");

                entity.Property(e => e.RoomNumber).HasColumnName("room_number");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Width)
                    .HasMaxLength(50)
                    .HasColumnName("width");

                entity.HasOne(d => d.Direct)
                    .WithMany(p => p.RealEstates)
                    .HasForeignKey(d => d.DirectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RealEstate_Direct");

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.RealEstates)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RealEstate_Account");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.RealEstates)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RealEstate_Location");

                entity.HasOne(d => d.Pay)
                    .WithMany(p => p.RealEstates)
                    .HasForeignKey(d => d.PayId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RealEstate_Payment");
            });

            modelBuilder.Entity<RealEstateImage>(entity =>
            {
                entity.ToTable("RealEstate_Image");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ImageName)
                    .HasMaxLength(50)
                    .HasColumnName("image_name");

                entity.Property(e => e.ImageUrl).HasColumnName("image_url");

                entity.Property(e => e.RealEstateId).HasColumnName("real_estate_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.RealEstate)
                    .WithMany(p => p.RealEstateImages)
                    .HasForeignKey(d => d.RealEstateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RealEstate_Image_RealEstate");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("Reservation");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AgencyId).HasColumnName("agency_id");

                entity.Property(e => e.BookingDate)
                    .HasColumnType("date")
                    .HasColumnName("booking_date");

                entity.Property(e => e.BookingTime)
                    .HasMaxLength(50)
                    .HasColumnName("booking_time");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("date")
                    .HasColumnName("create_at");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.RealEstateId).HasColumnName("real_estate_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.UpdateAt)
                    .HasColumnType("date")
                    .HasColumnName("update_at");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Reservation_Account");

                entity.HasOne(d => d.RealEstate)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.RealEstateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_RealEstate");
            });

            modelBuilder.Entity<ReservationTime>(entity =>
            {
                entity.HasKey(e => e.Date);

                entity.ToTable("ReservationTime");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Time1).HasMaxLength(50);

                entity.Property(e => e.Time2).HasMaxLength(50);

                entity.Property(e => e.Time3).HasMaxLength(50);

                entity.Property(e => e.Time4).HasMaxLength(50);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .HasColumnName("role_name");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Wallet>(entity =>
            {
                entity.ToTable("Wallet");

                entity.HasIndex(e => e.InvestorId, "FK_Wallet")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountBalance).HasColumnName("account_balance");

                entity.Property(e => e.InvestorId).HasColumnName("investor_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.WalletCreateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("wallet_create_at");

                entity.HasOne(d => d.Investor)
                    .WithOne(p => p.Wallet)
                    .HasForeignKey<Wallet>(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Wallet_Account");
            });

            modelBuilder.Entity<WalletHistory>(entity =>
            {
                entity.ToTable("Wallet_History");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("create_at");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.WalletId).HasColumnName("wallet_id");

                entity.HasOne(d => d.Wallet)
                    .WithMany(p => p.WalletHistories)
                    .HasForeignKey(d => d.WalletId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Wallet_History_Wallet");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
