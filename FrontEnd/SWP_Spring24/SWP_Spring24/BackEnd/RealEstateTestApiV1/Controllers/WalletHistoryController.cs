using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.Data;
using RealEstateTestApi.DTO.WalletHistoryDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/WalletHistory/")]
    [ApiController]
    public class WalletHistoryController : ControllerBase
    {
        private IWalletHistoryRepository walletHistoryRepository;
        private IWalletHistoryService walletHistoryService;
        private SWPRealEstateContext swpRealEstateContext;


        public WalletHistoryController(IWalletHistoryRepository walletHistoryRepository, IWalletHistoryService walletHistoryService, SWPRealEstateContext swpRealEstateContext)
        {
            this.walletHistoryRepository = walletHistoryRepository;
            this.walletHistoryService = walletHistoryService;
            this.swpRealEstateContext = swpRealEstateContext;
        }

        [HttpGet]
        [Route("GetAllWalletHistory")]
        public IActionResult GetAllWalletHistory()
        {
            List<WalletHistory> list = new List<WalletHistory>();
            list = walletHistoryRepository.GetAll();
            return Ok(list);
        }
        [HttpPost]
        [Route("CreateWalletHistory")]
        public IActionResult CreateWalletHistory(CreateWalletHistoryDTO walletHistorydto)
        {
            try
            {
                WalletHistory walletHistory = new WalletHistory();
                walletHistory = walletHistoryService.CreateWalletHistory(walletHistorydto);
                if (walletHistory != null)
                {
                    return Ok("Create Thành công");
                }
                return BadRequest("Create thất bại");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu DB");
            }
        }
        [HttpGet]
        [Route("GetWalletHistoryById/{id}")]
        public IActionResult GetWalletHistoryById(int id)
        {
            WalletHistory walletHistory = new WalletHistory();
            walletHistory = swpRealEstateContext.WalletHistories.Find(id);
            if (walletHistory != null)
            {
                return Ok(walletHistory);
            }
            return BadRequest("Không tìm thấy WalletHistory với id = " + id);
        }
    }
}
