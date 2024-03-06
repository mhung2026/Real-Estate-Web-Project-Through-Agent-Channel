using Microsoft.Extensions.Logging;
using RealEstateTestApi.Data;
using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.ServiceImpl
{
    public class ReservationTimeServiceImpl : IReservationTimeService
    {
       
        private IReservationTimeRepository _reservationTimeRepository;

        public ReservationTimeServiceImpl( IReservationTimeRepository _reservationTimeRepository)
        {
          
            this._reservationTimeRepository = _reservationTimeRepository;
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
            if (reservationTime != null)
            {
                reservationTime = _reservationTimeRepository.CreateReserationTime(reservationTime);
                return reservationTime;
            }
            return null;
        }


        public ReservationTime GetByDate(DateTime date)
        {
            ReservationTime reservationTime = new ReservationTime();
            reservationTime = _reservationTimeRepository.GetByDate(date);
            if (reservationTime != null)
            {
                return reservationTime;
            }
            return null;
        }

        public ReservationTime UpdateReservationTime(ReservationTime reservationTime)
        {
            ReservationTime reservationTime1 = new ReservationTime();
            reservationTime1 = _reservationTimeRepository.UpdateReservationTime(reservationTime1);
            if (reservationTime1 != null)
            {
                return reservationTime1;
            }
            return null;
        }
    }
}
