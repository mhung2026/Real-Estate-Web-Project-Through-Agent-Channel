using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/customer/")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private IReservationService reservationService;
        public CustomerController(IReservationService reservationService) { 
            this.reservationService = reservationService;
        }

        [HttpGet]
        [Route("getAllReservationByCustomerId/{id}")]
        public IActionResult getAllReservationByCustomerId(int id) {

            try
            {
                List<Reservation> list = reservationService.GetAllReservationByCustomerId(id);
                return Ok(list);
            }
            catch (Exception)
            {

                return BadRequest("Đã xảy ra lỗi hệ thống vui lòng thử lại ");
            }
        }
    }
}
