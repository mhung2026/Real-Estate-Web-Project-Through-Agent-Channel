using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RealEstateTestApi.Controllers
{
    [Route("api/admin/")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private IAccountRepository accountRepository;
        private IReservationRepository reservationRepository;
        public AdminController(IAccountRepository accountRepository, IReservationRepository reservationRepository) {
            this.accountRepository = accountRepository;
            this.reservationRepository = reservationRepository;
        }    
        // GET: api/<AdminController>
        [HttpGet]
        [Route("getAllAccount")]
        public IActionResult getAllAccountByAdmin()
        {
            try
            {
                List<Account> listAccount = accountRepository.adminGetAllAccount();
                return Ok(listAccount);
            }
            catch (Exception)
            {
                return NotFound("Hệ thống đã xảy ra lỗi");
            }
        }

        [HttpGet]
        [Route("GetAllReservation")]
        public IActionResult AdminGetAllReservation()
        {
            List<Reservation> list = reservationRepository.GetAllReservation();
            if (list != null)
            {
                //cho nay can to list vao trong repository
                return Ok(list.ToList());
            }
            else
            {
                return BadRequest("Reservation trống");
            }
        }

    }
}
