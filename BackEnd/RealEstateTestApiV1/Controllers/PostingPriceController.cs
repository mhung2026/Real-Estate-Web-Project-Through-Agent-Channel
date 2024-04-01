using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO.PostingPriceDTO;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/PostingPrice/")]
    [ApiController]
    public class PostingPriceController : ControllerBase
    {
        private IPostingPriceService _postingPriceService;

        public PostingPriceController(IPostingPriceService _postingPriceService)
        {
            this._postingPriceService = _postingPriceService;
        }

        [HttpGet]
        [Route("GetAllPostingPrice")]
        public IActionResult GetAll()
        {
            try
            {
                List<PostingPrice> list = _postingPriceService.GetAll();
                return Ok(list);

            }
            catch (Exception ex)
            {
                return BadRequest("loi DB");
            }
        }

        [HttpPost]
        [Route("CreatePostingPrice")]
        public IActionResult GetAll(CreatePostingPriceDto dto)
        {
            try
            {
                bool test = _postingPriceService.CreatePostingPrice(dto);
                if(test)
                {
                    return Ok("CreatePostingPrice thanh cong");
                }
                return BadRequest("CreatePostingPrice khong thanh cong");
            }
            catch (Exception ex)
            {
                return BadRequest("loi DB");
            }
        }
    }
}
