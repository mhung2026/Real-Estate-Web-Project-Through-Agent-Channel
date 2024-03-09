using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/reservation/")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IReservationService reservationService;
        private IReservationRepository reservationRepository;
        public ReservationController(IReservationService reservationService, IReservationRepository reservationRepository)
        {
            this.reservationService = reservationService;
            this.reservationRepository = reservationRepository;
        }
        [HttpGet]
        [Route("GetAllReservation")]
        public IActionResult GetAllReservation()
        {
            List<Reservation> list = new List<Reservation>();
            list = reservationRepository.GetAllReservation();
            if (list != null)
            {
                return Ok(list.ToList());
            }
            else
            {
                return Ok("Reservation trống");
            }
        }
        [HttpPost]
        [Route("CreateReservation")]
        public IActionResult CreateReservation(CreateReservationDto reservationDTO)
        {
            try
            {
                Reservation re = reservationService.CreateReservation(reservationDTO);
                if (re != null)
                {
                    return Ok("Create thành công");
                }
                else
                {
                    return BadRequest("create thất bại");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("không thể add!");
            }

        }
        [HttpPut]
        [Route("UpdateReservation/{id}")]
        public IActionResult UpdateReservation(int id, UpdateReservationDto reservationDTO)
        {
            try
            {
                Reservation re = reservationRepository.FindByID(id);
                if (re != null)
                {
                    re.CustomerId = reservationDTO.CustomerId;
                    re.Status = reservationDTO.Status;
                    re.UpdateAt = DateTime.Now;
                    re.AgencyId = reservationDTO.AgencyId;
                    re.RealEstateId = reservationDTO.RealEstateId;
                    re.BookingDate = reservationDTO.BookingDate;
                    re.BookingTime = reservationDTO.BookingTime;
                    Reservation re1 = reservationRepository.UpdateReservation(re);
                    return Ok("update reservation thành công");
                }
                else
                {
                    return BadRequest("không tìm thấy reservation");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("không thể update!");
            }
        }
        [HttpGet]
        [Route("GetResarvationByID/{id}")]
        public IActionResult GetReservationByID(int id)
        {
            Reservation re = reservationRepository.FindByID(id);
            if (re != null)
            {
                return Ok(re);
            }
            return BadRequest("không tìm thấy reservation");
        }
    }
}
