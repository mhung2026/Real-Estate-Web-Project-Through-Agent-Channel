using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IReservationTimeService
    {
        public ReservationTime CreateReserationTime(CreateReservationTimeDto createReservationtimeDto);
        public ReservationTime UpdateReservationTime(UpdateReservationTimeDto updateReservationtimeDto);
        public ReservationTime GetByDate(DateOnly date);


    }
}
