using RealEstateTestApi.DTO.WalletDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class WalletServiceImpl:IWalletService
    {
        private IWalletRepository walletRepository;

        public WalletServiceImpl(IWalletRepository walletRepository)
        {
            this.walletRepository = walletRepository;
        }
        public List<Wallet> GetAllWallets()
        {
            List<Wallet> list = walletRepository.GetAll();
            return list;
        }
        public Wallet CreateWallet(CreateWalletDTO walletdto)
        {
            if (walletdto != null)
            {
                Wallet wallet = new Wallet()
                {
                    InvestorId = walletdto.InvestorId,
                    AccountBalance = walletdto.AccountBalance,
                    WalletCreateAt = DateTime.Now,
                    Status = true,
                };
                walletRepository.CreateWallet(wallet);
                return wallet;
            }
            return null;
        }
        public Wallet UpdateWallet(Wallet wallet, UpdateWalletDTO walletdto)
        {
            if (walletdto != null)
            {
                wallet.AccountBalance = walletdto.AccountBalance;
                wallet.Status = walletdto.Status;
                walletRepository.UpdateWallet(wallet);
                return wallet;
            }
            return null;
        }
    }
}
