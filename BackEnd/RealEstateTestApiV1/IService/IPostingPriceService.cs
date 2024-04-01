using RealEstateTestApi.DTO.PostingPriceDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IPostingPriceService
    {
        public List<PostingPrice> GetAll();
        public bool CreatePostingPrice(CreatePostingPriceDto dto);
    }
}
