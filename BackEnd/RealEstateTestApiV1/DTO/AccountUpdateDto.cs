namespace RealEstateTestApi.DTO
{
    public class AccountUpdateDto
    {
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
        public DateTime? UpdateAt { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Address { get; set; }
    }
}
