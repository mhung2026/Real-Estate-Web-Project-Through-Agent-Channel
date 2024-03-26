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

        [HttpPut]
        [Route("CapNhatTaiKhoan/{id}")]
        public IActionResult UpdateAccount(int id, AccountUpdateDto dto)
        {
            try
            {
                Account account = accountService.updateAccountByAccountId(id, dto);
                if (account != null)
                {
                    return Ok("Cập nhật tài khoản thành công ");
                }
                return BadRequest("Cập nhật tài khoản thất bại vui lòng thử lại. ");
                
            }
            catch (Exception)
            {

                return BadRequest("Không thể thay đổi thông tin vui lòng thử lại sau. ");
            }
        }


        [HttpPut]
        [Route("QuenMatKhau/{email}")]
        public IActionResult UpdateAccount(string email, AccountForgotPasswordDto dto)
        {
            try
            {
                Account account = accountService.forgotPassword(email, dto);
                if (account != null)
                {
                    return Ok("Cập nhật mật khẩu mới thành công ");
                }
                return BadRequest("Cập nhật mật khẩu thất bại vui lòng thử lại. ");

            }
            catch (Exception)
            {

                return BadRequest("Không thể thay đổi mật khẩu vui lòng thử lại sau. ");
            }
        }

    }
}
