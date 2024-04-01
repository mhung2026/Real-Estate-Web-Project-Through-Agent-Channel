using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IPostingPriceRepository
    {
        public List<PostingPrice> GetAll();
        public bool CreatePostingPrice(PostingPrice postingPrice);
    }
}
