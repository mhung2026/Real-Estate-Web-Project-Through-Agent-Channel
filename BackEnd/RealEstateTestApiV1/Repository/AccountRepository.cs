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

        /* public Account findUsernameAndPasswordToLogin(LoginDto loginDto)
         {
             Account account = swpRealEstateContext.Accounts.Include(x => x.Role).FirstOrDefault(x => x.Email == loginDto.Email && x.Password == loginDto.Password);
             return account;
         }*/

        public Account findUsernameAndPasswordToLogin(LoginDto loginDto)
        {
            Account account = swpRealEstateContext.Accounts.Where(x => x.Email.Equals(loginDto.Email) && x.Password == (loginDto.Password)).Include(x=>x.Role).FirstOrDefault();
            return account;
        }
        public Account createAccount(Account account)
        {
            swpRealEstateContext.Accounts.Add(account);
            swpRealEstateContext.SaveChanges();
            return account;
        }

        public Account updateAccount(Account account)
        {
            swpRealEstateContext.Accounts.Update(account);
            swpRealEstateContext.SaveChanges();
            return account;
        }

        public Account findAccountById(int accountId)
        {
            Account account = swpRealEstateContext.Accounts.FirstOrDefault(x => x.Id == accountId);
            return account;
        }

        public Account findAccountByEmail(string email)
        {
            Account account = swpRealEstateContext.Accounts.FirstOrDefault(x => x.Email.Equals(email));
            return account;
        }
    }
}
