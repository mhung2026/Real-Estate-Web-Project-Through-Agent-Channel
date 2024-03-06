using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IWalletHistoryRepository
    {
        public List<WalletHistory> GetAll();
        public WalletHistory CreateWalletHistory(WalletHistory walletHistory);
    }
}
