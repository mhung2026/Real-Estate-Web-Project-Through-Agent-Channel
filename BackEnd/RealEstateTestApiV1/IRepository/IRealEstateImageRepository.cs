using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IRealEstateImageRepository
    {
        public void createRealEstateImage(RealEstateImage realEstateImage);
        public RealEstateImage findRealEstateImageById(int id);

        public RealEstateImage updateRealEstateImage(RealEstateImage realEstateImage);

        public List<RealEstateImage> getAllRealEstateImageUrl();
        public List<RealEstateImage> getAllRealEstateImageByRealEstateId(int realEstateId);


    }
}
