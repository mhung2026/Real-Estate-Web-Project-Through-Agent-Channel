using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IAccountRepository
    {
        public Account findUsernameAndPasswordToLogin(LoginDto loginDto);
        public List<Account> adminGetAllAccount();
        public Account createAccount(Account account);
    }
}
