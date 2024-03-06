using RealEstateTestApi.Data;
using RealEstateTestApi.DTO.WalletHistoryDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class WalletHistoryServiceImpl:IWalletHistoryService
    {
        private IWalletHistoryRepository walletHistoryRepository;
      
        public WalletHistoryServiceImpl(IWalletHistoryRepository walletHistoryRepository)
        {
           this.walletHistoryRepository = walletHistoryRepository;
        }

        public WalletHistory CreateWalletHistory(CreateWalletHistoryDTO wallethistoryDto)
        {
            if (wallethistoryDto != null)
            {
                WalletHistory walletHistory = new WalletHistory()
                {
                    WalletId = wallethistoryDto.WalletId,
                    Description = wallethistoryDto.Description,
                    CreateAt = DateTime.Now,
                };
                walletHistoryRepository.CreateWalletHistory(walletHistory);
                return walletHistory;
            }
            return null;
        }

        public List<WalletHistory> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
