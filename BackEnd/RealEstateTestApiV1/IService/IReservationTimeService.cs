using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IReservationTimeService
    {
        public ReservationTime CreateReserationTime(CreateReservationTimeDto createReservationtimeDto);
        public ReservationTime UpdateReservationTime(ReservationTime reservationTime);
        public ReservationTime GetByDate(DateTime date);


    }
}
