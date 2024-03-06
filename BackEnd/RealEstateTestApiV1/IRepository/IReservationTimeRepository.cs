using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.DTO.ReservationTimeDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IReservationTimeRepository
    {
        public List<ReservationTime> GetAll();
        public ReservationTime CreateReserationTime(ReservationTime reservationTime);
        public ReservationTime UpdateReservationTime(ReservationTime reservationTime);
        public ReservationTime GetByDate(DateTime date);

    }
}
