using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.Data;
using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.Controllers
{
    [Route("api/ReservationTime/")]
    [ApiController]
    public class ReservationTimeController : ControllerBase
    {
        
        private IReservationTimeService _reservationTimeService;
        private IReservationTimeRepository _reservationTimeRepository;

        public ReservationTimeController( IReservationTimeService reservationTimeService, IReservationTimeRepository reservationTimeRepository)
        {
          
           this._reservationTimeService = reservationTimeService;
           this._reservationTimeRepository = reservationTimeRepository;
        }

        [HttpGet]
        [Route("GetAllReservationTime")]
        public IActionResult GetAllReservationTime()
        {
            try
            {
                List<ReservationTime> list = new List<ReservationTime>();
                list = _reservationTimeRepository.GetAll();
                return Ok(list);

            }
            catch (Exception)
            {
                return BadRequest("Không thể lấy danh sách lịch hoạt động vui lòng thử lại ");
            }
        }



        [HttpPost]
        [Route("CreateReservationTimeByAdmin")]
        public IActionResult CreateReservationTime(CreateReservationTimeDto dto)
        {
            try
            {
                ReservationTime createReserationTime = _reservationTimeService.CreateReserationTime(dto);
                if(createReserationTime != null)
                {
                    return Ok("Tạo lịch hoạt động thành công " );
                }
                return BadRequest("Tạo lịch hoạt động mới không thành công, vui lòng thử lại");
               
            }
            catch (Exception )
            {

                return BadRequest("Không thể tạo lịch hoạt động mới vui lòng thử lại");

            }
        }

       /* [HttpPut]
        [Route("UpdateReservationTimeByDate/{date}")]
        public IActionResult UpdateReservationTimeById(DateOnly date, UpdateReservationTimeDto dto)
        {
            try
            {

                ReservationTime reservationTimeUpdate = _reservationTimeService.UpdateReservationTime(dto);
                if(reservationTimeUpdate != null)
                {
                    return Ok("Cập nhật lịch thành công ");
                }
                
                return BadRequest("Cập nhật lịch hoạt động thất bại vui lòng thử lại: ");
            }
            catch (Exception)
            {

                return BadRequest("Hệ thống cập nhật lịch đã có lỗi vui lòng thử lại: ");
            }
        }*/
    }
}
