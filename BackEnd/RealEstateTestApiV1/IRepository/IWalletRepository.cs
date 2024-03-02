using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IWalletRepository
    {
        public List<Wallet> GetAll();
        public Wallet GetById(int id);
        public Wallet CreateWallet(Wallet wallet);
        public Wallet UpdateWallet(Wallet wallet);
    }
}
