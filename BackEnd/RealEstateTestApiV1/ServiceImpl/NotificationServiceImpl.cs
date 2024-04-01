
using RealEstateTestApi.DTO.NotificationDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class NotificationServiceImpl:INotificationService
    {
        private INotificationRepository notificationRepository;
        public NotificationServiceImpl(INotificationRepository notificationRepository)
        {
            this.notificationRepository = notificationRepository;
        }

        public Notification createNotification(CreateNotificationDto dto)
        {
            Notification notification = new Notification()
            {
                AccountId = dto.AccountId,
                Description = dto.Description,
                CreateAt = DateTime.Now,
                Status = true

            };
            notificationRepository.createNotification(notification);
            return notification;
        }

        public List<Notification> GetAllNotifications(int id)
        {
            List<Notification> list = notificationRepository.getAllNotificationByAccount(id);
            return list;
        }
    }
}
