using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IRealEstateService
    {
        public Task<RealEstate> investorCreateRealEstateUsingInvestorId(int id, InvestorRealEstateDto dto);
        public List<RealEstateInformationGetDto> GetRealEstateInformationGetDto();

        public void updatePostRealEstateById(int realEstateId, PostUpdateDto dto);
        
    }
}
