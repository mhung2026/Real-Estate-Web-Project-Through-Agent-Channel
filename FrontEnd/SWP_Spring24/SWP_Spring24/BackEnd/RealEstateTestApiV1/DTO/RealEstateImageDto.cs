namespace RealEstateTestApi.DTO
{
    public class RealEstateImageDto
    {
        public string? ImageName { get; set; }
        public string ImageUrl { get; set; } = null!;
        public bool Status { get; set; }
    }
}
