using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IAccountService
    {
        public UserTokenDto loginIntoServer(LoginDto loginDto);
        public Account createAccount(AccountDto account);

        public Account updateAccountByAccountId(int accountId, AccountUpdateDto dto);
        public Account forgotPassword(string email, AccountForgotPasswordDto dto);
        
    }
}
