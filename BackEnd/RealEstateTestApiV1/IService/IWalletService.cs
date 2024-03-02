using RealEstateTestApi.DTO.WalletDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IWalletService
    {
        public List<Wallet> GetAllWallets();
        public Wallet CreateWallet(CreateWalletDTO walletdto);
        public Wallet UpdateWallet(Wallet wallet, UpdateWalletDTO walletdtoo);
    }
}
