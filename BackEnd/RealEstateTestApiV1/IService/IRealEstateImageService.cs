using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IRealEstateImageService
    {
        public RealEstateImage UpdateRealEstateImageById(int id, RealEstateImageDto dto);
    }
}
