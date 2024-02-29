using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;

namespace RealEstateTestApi.Repository
{
    public class WalletRepository:IWalletRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public WalletRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
    }
}
