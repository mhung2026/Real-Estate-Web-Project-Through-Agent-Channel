using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO.NotificationDTO;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.Controllers
{
    [Route("api/notification/")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotificationService notificationService;
        public NotificationController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet]
        [Route("getAllNotificationByAccount/{id}")]
        public IActionResult getAllNotificationByAccount(int id)
        {
            try
            {
                List<Notification> list = notificationService.GetAllNotifications(id);
                if (list != null)
                {
                    return Ok(list);
                }
                return NotFound("Không tìm thấy thông báo");
            }
            catch (Exception)
            {
                return BadRequest("Lỗi hệ thống vui lòng thử lại sau : ");
            }
        }

        [HttpPost]
        [Route("createNotification")]
        public IActionResult CreateNotificationByAccount(CreateNotificationDto dto)
        {
            try
            {
                notificationService.createNotification(dto);                
                return Ok("Cập nhật thông báo thành công");
            }
            catch (Exception)
            {
                return BadRequest("Lỗi hệ thống vui lòng thử lại sau : ");
            }
        }

    }
}
