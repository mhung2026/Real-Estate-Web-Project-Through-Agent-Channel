namespace RealEstateTestApi.DTO
{
    public class LocationDto
    {
        public string Ward { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public bool Status { get; set; }
    }
}
