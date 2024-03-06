using RealEstateTestApi.Data;
using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class ReservationTimeRepository : IReservationTimeRepository
    {
        private SWPRealEstateContext SWPRealEstateContext;

        public ReservationTimeRepository(SWPRealEstateContext SWPRealEstateContext)
        {
            this.SWPRealEstateContext = SWPRealEstateContext;
        }

        public List<ReservationTime> GetAll()
        {
            List<ReservationTime> list = new List<ReservationTime>();
            list = SWPRealEstateContext.ReservationTimes.ToList();
            return list;
        }

        public ReservationTime CreateReserationTime(ReservationTime reservationTime)
        {
            SWPRealEstateContext.ReservationTimes.Add(reservationTime);
            SWPRealEstateContext.SaveChanges();
            return reservationTime;
        }

        //Function này thiếu save() 
        //ko đc map dto trong class repository
        public ReservationTime UpdateReservationTime(ReservationTime reservationTime)
        {
            SWPRealEstateContext.ReservationTimes.Update(reservationTime);
            SWPRealEstateContext.SaveChanges();
            return reservationTime;
        }

        public ReservationTime GetByDate(DateTime date)
        {
            ReservationTime reservationTime = null;
            reservationTime = SWPRealEstateContext.ReservationTimes.Find(date);
            return reservationTime;
        }
    }
}
