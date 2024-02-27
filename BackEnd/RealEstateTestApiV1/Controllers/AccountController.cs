using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/account/")]
    [ApiController]
    public class AccountController : Controller
    {
        private IAccountService accountService;
       

        public AccountController(IAccountService accountService) { 
            this.accountService = accountService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult loginIntoServer(LoginDto loginDto)
        {
            try
            {
                UserTokenDto accessAndRefreshToken = accountService.loginIntoServer(loginDto);
                if (accessAndRefreshToken == null)
                {
                    return BadRequest("Tên đăng nhập hoặc mật khẩu sai, vui lòng nhập lại. ");
                }
                return Ok(accessAndRefreshToken);

            }
            catch (Exception)
            {

                return NotFound("Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại. ");

            }

        }

        [HttpPost]
        [Route("TaoTaiKhoan")]
        public IActionResult CreateAccount(AccountDto dto)
        {
            try
            {
                Account account = accountService.createAccount(dto);
                if (account == null)
                {
                    return BadRequest("Tạo tài khoảng thất bại, vui lòng tạo lại. ");
                }
                return Ok(account);
            }
            catch (Exception ex)
            {
                return NotFound("Đã xảy ra lỗi trong quá trình tạo , vui lòng thử lại. ");
            }
        }

    }
}
