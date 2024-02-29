using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;

namespace RealEstateTestApi.ServiceImpl
{
    public class WalletServiceImpl:IWalletService
    {
        private IWalletRepository walletRepository;

        public WalletServiceImpl(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }
    }
}
