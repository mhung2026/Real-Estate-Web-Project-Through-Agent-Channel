using Microsoft.EntityFrameworkCore.Update.Internal;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.ServiceImpl
{
    public class RealEstateImageServiceImpl:IRealEstateImageService
    {
        private IRealEstateImageRepository realEstateImageRepository;
        public RealEstateImageServiceImpl(IRealEstateImageRepository realEstateImageRepository)
        {
            this.realEstateImageRepository = realEstateImageRepository;
        }

        public RealEstateImage UpdateRealEstateImageById(int id, RealEstateImageDto dto)
        {
            RealEstateImage realEstateImage = realEstateImageRepository.findRealEstateImageById(id);
            if(realEstateImage == null)
            {
                return null;
            }
            realEstateImage.ImageUrl = dto.ImageUrl;
            realEstateImage.Status = dto.Status;
            realEstateImageRepository.updateRealEstateImage(realEstateImage);
            return realEstateImage;
        }
    }
}
