using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/customer/")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private IReservationService reservationService;
        private IRealEstateService realEstateService;
        public CustomerController(IReservationService reservationService, IRealEstateService realEstateService) { 
            this.reservationService = reservationService;
            this.realEstateService = realEstateService;
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

        [HttpPut]
        [Route("updateDepositContractByCustomerPost/{id}")]
        public IActionResult updateDepositContractByCustomerUsingPostId(int id, CustomerDepositContractDTO dto)
        {
            try
            {
                realEstateService.updateDepositContractByCustomer(id, dto);

                return Ok("Tạo thành công");
            }
            catch (Exception e)
            {
                return BadRequest("Lỗi hệ thống "+ e);
            }
                
        }

        [HttpPut]
        [Route("updateSellContractByCustomerPost/{id}")]
        public IActionResult updateSellContractByCustomerUsingPostId(int id, CustomerSellContractDTO dto)
        {
            try
            {
                realEstateService.updateSellContractByCustomer(id, dto);

                return Ok("Tạo thành công");
            }
            catch (Exception e)
            {
                return BadRequest("Lỗi hệ thống " + e);
            }

        }
    }
}
