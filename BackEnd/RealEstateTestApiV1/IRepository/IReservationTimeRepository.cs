using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IReservationTimeRepository
    {
        public List<ReservationTime> GetAll();
        public ReservationTime CreateReserationTime(CreateReservationTimeDto createReservationtimeDto);
        public ReservationTime UpdateReservationTime(UpdateReservationTimeDto updateReservationtimeDto);
        public ReservationTime GetByDate(DateOnly date);

    }
}
