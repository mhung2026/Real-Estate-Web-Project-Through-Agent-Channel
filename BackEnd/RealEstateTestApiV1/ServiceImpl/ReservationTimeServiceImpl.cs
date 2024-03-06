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
            ReservationTime reservationTime = new ReservationTime();
            reservationTime = _reservationTimeRepository.CreateReserationTime(createReservationtimeDto);
            if (reservationTime != null)
            {
                return reservationTime;
            }
            return null;
        }


        public ReservationTime GetByDate(DateOnly date)
        {
            ReservationTime reservationTime = new ReservationTime();
            reservationTime = _reservationTimeRepository.GetByDate(date);
            if (reservationTime != null)
            {
                return reservationTime;
            }
            return null;
        }

        public ReservationTime UpdateReservationTime(UpdateReservationTimeDto updateReservationtimeDto)
        {
            ReservationTime reservationTime = new ReservationTime();
            reservationTime = _reservationTimeRepository.UpdateReservationTime(updateReservationtimeDto);
            if (reservationTime != null)
            {
                return reservationTime;
            }
            return null;
        }
    }
}
