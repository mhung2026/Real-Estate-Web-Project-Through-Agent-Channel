using RealEstateTestApi.DTO.NotificationDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface INotificationService
    {
        public List<Notification> GetAllNotifications(int id);
        public Notification createNotification(CreateNotificationDto dto);
    }
}
