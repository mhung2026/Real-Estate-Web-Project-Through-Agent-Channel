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

        [HttpGet]
        [Route("GetReservationTimeByDate")]
        public IActionResult GetReservationTimeByDate(DateTime date)
        {
            try
            {
                ReservationTime reservationTime = new ReservationTime();
                reservationTime = _reservationTimeRepository.GetByDate(date);
                if (reservationTime != null)
                {
                    return Ok(reservationTime);
                }
                return BadRequest("khong tim thay reservation");
            }
            catch (Exception)
            {
                return BadRequest("loi db ");
            }
        }


        /* cái này chờ Hiệp sửa cập nhật lại */
        /* [HttpPut]
                [Route("UpdateReservationTime/{date}")]
                public IActionResult UpdateReservationTime(DateTime date, UpdateReservationTimeDto dto)
                {
                    try
                    {
                        ReservationTime reserationTime = _reservationTimeRepository.GetByDate(date);
                        if (reserationTime != null)
                        {
                            reserationTime.Time1 = dto.Time1;
                            reserationTime.Time2 = dto.Time2;
                            reserationTime.Time3 = dto.Time3;
                            reserationTime.Time4 = dto.Time4;
                            reserationTime.Status = dto.Status;
                            ReservationTime check = _reservationTimeService.UpdateReservationTime(reserationTime);
                            return Ok("update thanh cong");
                        }
                        return BadRequest("khon tim thay ReservationTime voi Date = " + date);

                    }
                    catch (Exception)
                    {

                        return BadRequest("loi db");

                    }
                }*/
        /**/



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
