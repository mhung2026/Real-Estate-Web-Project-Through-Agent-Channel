using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IAccountRepository
    {
        public Account findUsernameAndPasswordToLogin(LoginDto loginDto);
        public List<Account> adminGetAllAccount();
        public Account createAccount(Account account);
        public Account updateAccount(Account account);
        public Account findAccountById(int accountId);

        public Account findAccountByEmail(string email);
    }
}
