namespace RealEstateTestApi.DTO
{
    public class UserLoginBasicInformationDto
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; } = null!;
    }
}
