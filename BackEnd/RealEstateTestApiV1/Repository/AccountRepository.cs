using Microsoft.EntityFrameworkCore;
using RealEstateTestApi.Data;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public AccountRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }

        public List<Account> adminGetAllAccount()
        {
            List<Account> listAccount = swpRealEstateContext.Accounts.ToList();
            return listAccount;
        }

        public Account findUsernameAndPasswordToLogin(LoginDto loginDto)
        {
            Account account = swpRealEstateContext.Accounts.Include(x => x.Role).FirstOrDefault(x => x.Email == loginDto.Email && x.Password == loginDto.Password);
            return account;
        }

        public Account createAccount(Account account)
        {
            swpRealEstateContext.Accounts.Add(account);
            swpRealEstateContext.SaveChanges();
            return account;
        }
    }
}
