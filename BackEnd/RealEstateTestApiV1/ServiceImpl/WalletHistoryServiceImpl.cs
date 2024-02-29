using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;

namespace RealEstateTestApi.ServiceImpl
{
    public class WalletHistoryServiceImpl:IWalletHistoryService
    {
        private IWalletHistoryRepository walletHistoryRepository;
      
        public WalletHistoryServiceImpl(IWalletHistoryRepository walletHistoryRepository)
        {
           this.walletHistoryRepository = walletHistoryRepository;
        }
    }
}
