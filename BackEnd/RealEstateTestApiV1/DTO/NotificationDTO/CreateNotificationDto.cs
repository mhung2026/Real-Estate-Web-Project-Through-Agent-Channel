namespace RealEstateTestApi.DTO.NotificationDTO
{
    public class CreateNotificationDto
    {
        public int AccountId { get; set; }
        public string Description { get; set; } = null!;
    }
}
