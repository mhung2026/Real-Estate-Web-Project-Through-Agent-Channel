using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;
using System.ComponentModel;

namespace RealEstateTestApi.Repository
{
    public class DirectRepository : IDirectRepository
    {
        private SWPRealEstateContext swpRealEstateContext;

        public DirectRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;   
        }
        public List<Direct> getAllDirect()
        {
            List<Direct> listDirect = swpRealEstateContext.Directs.ToList();
            return listDirect;
        }
    }
}
