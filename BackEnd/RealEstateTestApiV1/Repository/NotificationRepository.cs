using Microsoft.EntityFrameworkCore;
using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class NotificationRepository:INotificationRepository
    {
        private SWPRealEstateContext _realEstateContext;
        public NotificationRepository(SWPRealEstateContext _realEstateContext) { 
            this._realEstateContext = _realEstateContext;
        }

        public List<Notification> getAllNotification()
        {
            List<Notification> list = _realEstateContext.Notifications.ToList();
            return list;
        }

        public List<Notification> getAllNotificationByAccount(int id)
        {
            List<Notification> list  = _realEstateContext.Notifications.Where(x=>x.AccountId == id).ToList();
            return list;
        }

        public void createNotification(Notification notification)
        {
           _realEstateContext.Notifications.Add(notification);
           _realEstateContext.SaveChanges();
        }
    }
}
