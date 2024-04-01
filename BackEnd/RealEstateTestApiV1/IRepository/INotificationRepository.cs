using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface INotificationRepository
    {
        public List<Notification> getAllNotificationByAccount(int id);
        public void createNotification(Notification notification);
    }
}
