using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IRealEstateService
    {
        public Task<RealEstate> investorCreateRealEstateUsingInvestorId(int id, InvestorRealEstateDto dto);
        public List<RealEstateInformationGetDto> GetRealEstateInformationGetDto();

        public void updatePostRealEstateById(int realEstateId, PostUpdateDto dto);

        public void updatePostRealEstateByAgency(int realEstateId, AgencyPostUpdateDTO dto);

        public void updateContractPostRealEstateByAgency(int realEstateId, AgencyPostUpdateContractDTO dto);

        public void updateDepositContractByCustomer(int realEstateId, CustomerDepositContractDTO dto);
        public void updateSellContractByCustomer(int realEstateId, CustomerSellContractDTO dto);



    }
}
