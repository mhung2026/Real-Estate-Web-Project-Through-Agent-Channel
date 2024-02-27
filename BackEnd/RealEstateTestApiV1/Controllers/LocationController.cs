using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RealEstateTestApi.Controllers
{
    [Route("api/location/")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILocationRepository locationRepository;
        public LocationController(ILocationRepository locationRepository)
        {
            this.locationRepository = locationRepository;            
        }

        // GET api/<list location>       
        [HttpGet]
        [Route("getAllLocation")]
        public IActionResult getAllLocation()
        {
            try
            {
               List<Location> listLocation = locationRepository.getAllLocation();
                return Ok(listLocation);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


        [HttpGet]
        [Route("getLocationById/{id}")]
        public IActionResult getLocationById(int id)
        {
            try
            {
                Location location = locationRepository.findLocationById(id);
                if (location == null)
                {
                    return BadRequest("Không tìm thấy id");
                }
                return Ok(location);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("updateLocationById/{id}")]
        public IActionResult updateLocationById(int id, LocationDto locationDto)
        {
            try
            {
                Location location = locationRepository.findLocationById(id);
                if (location == null)
                {
                    return BadRequest("Không tìm thấy id của vị trí");
                }
                location.Ward = locationDto.Ward;
                location.District = locationDto.District;
                location.City = locationDto.City;
                location.Status = locationDto.Status;
                return Ok("Chỉnh sửa thành công");
            }
            catch
            {
                return BadRequest("Không thể cập nhật vị trí");
            }
        }

    }
}
