namespace RealEstateTestApi.DTO
{
    public class ImagePostUpdateDto
    {
        public int Id { get; set; }
        public int RealEstateId { get; set; }
        public string? ImageName { get; set; }
        public string ImageUrl { get; set; } = null!;
       
    }
}
