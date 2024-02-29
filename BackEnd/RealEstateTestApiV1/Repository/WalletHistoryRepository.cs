using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;

namespace RealEstateTestApi.Repository
{
    public class WalletHistoryRepository:IWalletHistoryRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public WalletHistoryRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
    }
}
