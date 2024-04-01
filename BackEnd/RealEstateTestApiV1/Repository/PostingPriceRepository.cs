using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class PostingPriceRepository:IPostingPriceRepository
    {
        private SWPRealEstateContext _realEstateContext;

        public PostingPriceRepository(SWPRealEstateContext _realEstateContext)
        {
            this._realEstateContext = _realEstateContext;
        }

        public bool CreatePostingPrice(PostingPrice postingPrice)
        {
            try
            {
                _realEstateContext.PostingPrices.Add(postingPrice);
                _realEstateContext.SaveChanges();
                return true;
            }
            catch (Exception )
            {
                return false;
            }
        }

        public List<PostingPrice> GetAll()
        {
            try
            {
                List<PostingPrice> list = new List<PostingPrice>();
                list = _realEstateContext.PostingPrices.ToList();
                _realEstateContext.SaveChanges();
                return list;
            }
            catch (Exception )
            {
                return null;
            }

        }
    }
}
