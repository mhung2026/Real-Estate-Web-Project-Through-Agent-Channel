using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.Controllers
{
    [Route("api/RealEstateImage/")]
    [ApiController]
    public class RealEstateImageController : ControllerBase
    {
        private IRealEstateImageRepository realEstateImageRepository;
        private IRealEstateImageService realEstateImageService;
        public RealEstateImageController(IRealEstateImageRepository realEstateImageRepository,IRealEstateImageService realEstateImageService) {
            this.realEstateImageRepository = realEstateImageRepository;
            this.realEstateImageService = realEstateImageService;
        }

        [HttpGet]
        [Route("GetAllRealEstateImageUrlByRealEstateId/{id}")]
        public IActionResult getRealEstateImageUrlByRealEstateId(int id)
        {
            try
            {
                List<RealEstateImage> list = realEstateImageRepository.getAllRealEstateImageByRealEstateId(id);
                return Ok(list);
            }
            catch (Exception)
            {

                return BadRequest("Đã xảy ra lỗi khi tải dữ liệu, vui lòng thử lại. ");
            }
        }

       

        [HttpPut]
        [Route("UpdateImageUrlbyId/{id}")]
        public IActionResult updateImageByRealEstateId(int id, RealEstateImageDto dto)
        {
            try
            {
                RealEstateImage realEstateImage = realEstateImageService.UpdateRealEstateImageById(id,dto);
                return Ok(realEstateImage);
            }
            catch (Exception)
            {

                return BadRequest("Không thể cập nhật hình ảnh mới, vui lòng thử lại");
            }
        }

        [HttpGet]
        [Route("GetAllImageUrl")]
        public IActionResult getAllRealEstateImage()
        {
            try
            {
                List<RealEstateImage> list = realEstateImageRepository.getAllRealEstateImageUrl();
                return Ok(list);
            }
            catch (Exception)
            {

                return BadRequest("Không thể tải dữ liệu, vui lòng thử lại");
            }
        }

    }
}
