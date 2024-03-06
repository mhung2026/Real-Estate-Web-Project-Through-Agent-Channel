using RealEstateTestApi.DTO.WalletHistoryDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IWalletHistoryService
    {
        public List<WalletHistory> GetAll();
        public WalletHistory CreateWalletHistory(CreateWalletHistoryDTO walletHistoryDto);
    }
}
