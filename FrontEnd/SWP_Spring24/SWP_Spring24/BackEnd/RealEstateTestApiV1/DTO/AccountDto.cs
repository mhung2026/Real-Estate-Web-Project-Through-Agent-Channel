namespace RealEstateTestApi.DTO
{
    public class AccountDto
    {
        public int RoleId { get; set; }
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
        public DateTime? CreateAt { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public bool Status { get; set; }
    }
}
