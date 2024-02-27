using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IRealEstateRepository
    {
        //function ko đồng bộ
        // public RealEstate createRealEstate(RealEstate realEstate);

        //sử dụng function đồng bộ
        public Task<RealEstate> createRealEstateAsync(RealEstate realEstate);
        public List<RealEstate> getAllRealEstate();
        //public List<RealEstate> getAllRealEstateForView(int investorId);
        public List<RealEstate> getAllRealEstateForView();

        //cap nhat bai dang
        public void updatePostRealEstate(RealEstate realEstate);

        //tim realestate theo id
        public RealEstate getRealEstateById(int id);





    }
}
