using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class WalletRepository:IWalletRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public WalletRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
        public List<Wallet> GetAll()
        {
            List<Wallet> list = new List<Wallet>();
            list = swpRealEstateContext.Wallets.ToList();
            return list;
        }
        public Wallet GetById(int id)
        {
            Wallet wallet = null;
            wallet = swpRealEstateContext.Wallets.Find(id);
            return wallet;
        }
        public Wallet CreateWallet(Wallet wallet)
        {
            swpRealEstateContext.Wallets.Add(wallet);
            swpRealEstateContext.SaveChanges();
            return wallet;
        }
        public Wallet UpdateWallet(Wallet wallet)
        {
            swpRealEstateContext.Wallets.Update(wallet);
            swpRealEstateContext.SaveChanges();
            return wallet;
        }
    }
}
