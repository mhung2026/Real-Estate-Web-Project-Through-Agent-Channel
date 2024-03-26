using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/agency/")]
    [ApiController]
    public class AgencyController : ControllerBase
    {
        private IRealEstateService realEstateService;
        private IRealEstateRepository realEstateRepository;
        private IReservationService reservationService;
        private IReservationRepository reservationRepository;
         public AgencyController(IRealEstateService realEstateService, IRealEstateRepository realEstateRepository, IReservationRepository reservationRepository, IReservationService reservationService)
        {
            this.realEstateService = realEstateService;
            this.realEstateRepository = realEstateRepository;
            this.reservationRepository = reservationRepository;
            this.reservationService = reservationService;
        }

        [HttpGet]
        [Route("getAllReservationByAgencyId/{id}")]
        public IActionResult getAllReservationByAgencyId(int id)
        {
            try
            {
                List<Reservation> list = reservationService.GetAllReservationByAgencyId(id);
                if (list != null)
                {
                    return Ok(list);
                }
                return BadRequest("Thông tin Id Agency không hợp lệ vui lòng thử lại :");
            }
            catch(Exception)
            {
                return BadRequest("Đã xảy ra lỗi hệ thống vui lòng thử lại ");
            }
        
        }


        [HttpPut]
        [Route("updatePostById/{id}")]
        public IActionResult updatePostById(int id, PostUpdateDto dto)
        {
            try
            {
                realEstateService.updatePostRealEstateById(id, dto);
                return Ok("Cập nhật thành công");
            }
            catch (Exception)
            {

                return BadRequest("Cập nhật không thành công vui lòng thử lại");
            }

        }
    }
}
