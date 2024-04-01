

using RealEstateTestApi.Models;
using RealEstateTestApi.DTO.PostingPriceDTO;

namespace RealEstateTestApi.IService
{
    public interface IPostingPriceService
    {

        public List<PostingPrice> GetAll();
        public bool CreatePostingPrice(CreatePostingPriceDto dto);
    }
}
