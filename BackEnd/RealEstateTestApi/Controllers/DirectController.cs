using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.Controllers
{
    [Route("api/direct/")]
    [ApiController]
    public class DirectController : Controller
    {
        private IDirectRepository directRepository;
        public DirectController(IDirectRepository directRepository)
        {
            this.directRepository = directRepository;
        }

        [HttpGet]
        [Route("getAllDirect")]
        public IActionResult getAllDirect()
        {
            try
            {
                List<Direct> listDirect = directRepository.getAllDirect();
                return Ok(listDirect);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
