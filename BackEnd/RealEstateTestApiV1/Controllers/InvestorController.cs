using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RealEstateTestApi.Controllers
{
    [Route("api/invester/")]
    [ApiController]
    public class InvestorController : ControllerBase
    {
        private IRealEstateService realEstateService;
        private IRealEstateRepository realEstateRepository;
        public InvestorController(IRealEstateService realEstateService, IRealEstateRepository realEstateRepository)
        {
            this.realEstateService = realEstateService;
            this.realEstateRepository = realEstateRepository;
        }

        [HttpGet]
        [Route("getAllRealEstate")]
        public IActionResult getAllRealEstate()
        {
            try
            {
                List<RealEstate> list = realEstateRepository.getAllRealEstate();
                return Ok(list);
            }
            catch (Exception ex)
            {

                return BadRequest("Ko thể lấy danh sách villa"+ex);
            }
            
        }
        
      

        // POST api/<InvestorController>
        [HttpPost]
        [Route("createNewRealEstate/{id}")]
        public async Task<IActionResult> createPostUsingInvestorId(int id, InvestorRealEstateDto dto)
        {
            try {
                RealEstate realEstate = await realEstateService.investorCreateRealEstateUsingInvestorId(id, dto);
                return Ok(realEstate);
            }
            catch(Exception)
            {
                return BadRequest("Đã xảy ra lỗi trong quá trình tạo mới, vui lòng thử lại. ");
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
       



        [HttpGet]
        [Route("getRealEstateById/{id}")]
        public IActionResult getRealEstateById(int id)
        {
            try
            {
                RealEstate realEstate = realEstateRepository.getRealEstateById(id);
                return Ok(realEstate);
            }
            catch (Exception)
            {

                return BadRequest("Ko thể hiện ra thông tin villa .");
            }

        }

        //code nap chuc nang nap tien o day


    }
}
