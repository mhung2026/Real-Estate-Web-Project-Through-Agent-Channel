namespace RealEstateTestApi.DTO
{
    public class PostUpdateDto
    {
     
        public int PayId { get; set; }
        public int DirectId { get; set; }
        public string RealestateName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public int? RoomNumber { get; set; }
        public string? Length { get; set; }
        public string? Width { get; set; }
        public string? Perimeter { get; set; }
        public string? Area { get; set; }
        public string? LegalStatus { get; set; }
        public string? Price { get; set; }
        public string? Discount { get; set; }
        public string? Discription { get; set; }
        public string Ward { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public List<ImagePostUpdateDto> listRealEstateImageUrl { get; set; }
        public int Status { get; set; }
    }
}
