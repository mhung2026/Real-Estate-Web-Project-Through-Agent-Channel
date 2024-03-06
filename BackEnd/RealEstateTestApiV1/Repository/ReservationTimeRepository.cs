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

        public ReservationTime CreateReserationTime(CreateReservationTimeDto createReservationtimeDto)
        {
            ReservationTime reservationTime = new ReservationTime()
            {
                Date = createReservationtimeDto.Date,
                Time1 = createReservationtimeDto.Time1,
                Time2 = createReservationtimeDto.Time2,
                Time3 = createReservationtimeDto.Time3,
                Time4 = createReservationtimeDto.Time4,
                Status = true
            };
            SWPRealEstateContext.ReservationTimes.Add(reservationTime);
            SWPRealEstateContext.SaveChanges();
            return reservationTime;
        }

        //Function này thiếu save() 
        //ko đc map dto trong class repository
        public ReservationTime UpdateReservationTime(UpdateReservationTimeDto updateReservationtimeDto)
        {
            ReservationTime reservationTime = new ReservationTime()
            {
                Time1 = updateReservationtimeDto.Time1,
                Time2 = updateReservationtimeDto.Time2,
                Time3 = updateReservationtimeDto.Time3,
                Time4 = updateReservationtimeDto.Time4,
                Status = updateReservationtimeDto.Status
            };
            SWPRealEstateContext.ReservationTimes.Update(reservationTime);
            SWPRealEstateContext.SaveChanges();
            return reservationTime;
        }

        public ReservationTime GetByDate(DateOnly date)
        {
            ReservationTime reservationTime = null;
            reservationTime = SWPRealEstateContext.ReservationTimes.Find(date);
            return reservationTime;
        }
    }
}
