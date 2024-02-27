using Microsoft.EntityFrameworkCore;
using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class RealEstateRepository:IRealEstateRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public RealEstateRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }

        //function ko đồng bộ
        /* public RealEstate createRealEstate(RealEstate realEstate)
         {
             swpRealEstateContext.RealEstates.Add(realEstate);
             swpRealEstateContext.SaveChanges();
             return realEstate;
         }*/

        //function đồng bộ
        //sử dụng function này
        public async Task<RealEstate> createRealEstateAsync(RealEstate realEstate)
        {
            await swpRealEstateContext.RealEstates.AddAsync(realEstate);
            await swpRealEstateContext.SaveChangesAsync();
            return realEstate;
        }

        //function này chưa clean dùng để test nhưng chạy ổn
        public List<RealEstate> getAllRealEstate()
        {
            List<RealEstate> listRealEstate = swpRealEstateContext.RealEstates.Include(x=>x.RealEstateImages).ToList();
            return listRealEstate;
        }

        //function này clean
        public List<RealEstate> getAllRealEstateForView()
        {
            List<RealEstate> listRealEstate = swpRealEstateContext.RealEstates.Include(x => x.RealEstateImages).Include(x => x.Investor).Include(x => x.Location).Include(x => x.Direct).Include(x => x.Pay).ToList();
            return listRealEstate;
        }

        public RealEstate getRealEstateById(int id)
        {
            RealEstate realEstate = swpRealEstateContext.RealEstates.Include(x => x.RealEstateImages).Include(x => x.Direct).Include(x => x.Pay).Include(x => x.Location).FirstOrDefault(x => x.Id == id);
            return realEstate;
        }

        public void updatePostRealEstate(RealEstate realEstate)
        {
            swpRealEstateContext.RealEstates.Update(realEstate);
            swpRealEstateContext.SaveChanges();
        }


      
    }
}
