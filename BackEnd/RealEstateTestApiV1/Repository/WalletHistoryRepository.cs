using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class WalletHistoryRepository:IWalletHistoryRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public WalletHistoryRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
        public WalletHistory CreateWalletHistory(WalletHistory wallethistory)
        {
            swpRealEstateContext.WalletHistories.Add(wallethistory);
            swpRealEstateContext.SaveChanges();
            return wallethistory;

        }

        public List<WalletHistory> GetAll()
        {
            List<WalletHistory> list = new List<WalletHistory>();
            list = swpRealEstateContext.WalletHistories.ToList();
            return list;
        }
    }
}
