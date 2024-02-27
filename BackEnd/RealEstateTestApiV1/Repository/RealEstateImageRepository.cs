using Microsoft.EntityFrameworkCore;
using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class RealEstateImageRepository:IRealEstateImageRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public RealEstateImageRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }

        public RealEstateImage findRealEstateImageById(int id)
        {
            RealEstateImage realEstateImage = swpRealEstateContext.RealEstateImages.FirstOrDefault(x => x.Id == id);
            return realEstateImage;
        }

        public List<RealEstateImage> getAllRealEstateImageUrl()
        {
            List<RealEstateImage> list = swpRealEstateContext.RealEstateImages.ToList();
            return list;
        }

        public void createRealEstateImage(RealEstateImage realEstateImage)
        {
            swpRealEstateContext.RealEstateImages.Add(realEstateImage);
            swpRealEstateContext.SaveChanges();
        }

        public RealEstateImage updateRealEstateImage(RealEstateImage realEstateImage)
        {
            swpRealEstateContext.RealEstateImages.Update(realEstateImage);
            swpRealEstateContext.SaveChanges();
            return realEstateImage;
        }

        public List<RealEstateImage> getAllRealEstateImageByRealEstateId(int id)
        {
            List<RealEstateImage> list = swpRealEstateContext.RealEstateImages.Where(x=>x.RealEstateId == id).ToList();
            return list;
        }

        
    }
}
