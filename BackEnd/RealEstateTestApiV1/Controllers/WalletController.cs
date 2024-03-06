using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO.WalletDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/Wallet/")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private IWalletRepository walletRepository;
        private IWalletService walletService;

        public WalletController(IWalletRepository walletRepository, IWalletService walletService)
        {
            this.walletRepository = walletRepository;
            this.walletService = walletService;
        }

        [HttpGet]
        [Route("GetAllWallet")]
        public IActionResult GetAll()
        {
            List<Wallet> list = walletService.GetAllWallets();
            return Ok(list);
        }
        [HttpPost]
        [Route("CreateWallet")]
        public IActionResult CreateWallet(CreateWalletDTO walletdto)
        {
            try
            {
                Wallet wallet = new Wallet();
                wallet = walletService.CreateWallet(walletdto);
                if (wallet == null)
                {
                    return BadRequest("Lỗi dữ liệu đầu vào");
                }
                return Ok("Create thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Create Lỗi DB");
            }
        }
        [HttpPut]
        [Route("UpdateWallet/{id}")]
        public IActionResult UpdateWallet(int id, UpdateWalletDTO walletdto)
        {
            Wallet wallet = new Wallet();
            wallet = walletRepository.GetById(id);
            if (wallet == null)
            {
                return BadRequest("Không tìm thấy wallet với id = " + id);
            }
            walletService.UpdateWallet(wallet, walletdto);
            return Ok("Update thành công");
        }
        [HttpGet]
        [Route("GetWalletById/{id}")]
        public IActionResult GetWalletById(int id)
        {
            try
            {
                Wallet wallet = walletRepository.GetById(id);
                if (wallet == null)
                {
                    return BadRequest("Không tìm thấy wallet với id = " + id);
                }
                return Ok(wallet);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi hệ thống");
            }

        }
    }
}
