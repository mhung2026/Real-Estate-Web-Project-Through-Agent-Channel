using RealEstateTestApi.DTO.PostingPriceDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class PostingPriceServiceImpl : IPostingPriceService
    {
        private IPostingPriceRepository PostingPriceRepository;
        public PostingPriceServiceImpl(IPostingPriceRepository PostingPriceRepository)
        {
            this.PostingPriceRepository = PostingPriceRepository;
        }
        public bool CreatePostingPrice(CreatePostingPriceDto dto)
        {
            PostingPrice postingPrice = new PostingPrice()
            {
                Price = dto.Price,
                CreateAt = DateTime.Now,
                Status = true
            };
            bool test = PostingPriceRepository.CreatePostingPrice(postingPrice);
            return test;
        }

        public List<PostingPrice> GetAll()
        {
            List<PostingPrice> list = new List<PostingPrice>();
            list = PostingPriceRepository.GetAll();
            return list;
        }
    }
}
