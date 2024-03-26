using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IReservationService
    {
        public List<Reservation> GetAlllReservation();
        public Reservation CreateReservation(CreateReservationDto reservation);
        public Reservation UpdateReservation(UpdateReservationDto reservation);

        //26_03
        public List<Reservation> GetAllReservationByAgencyId(int id);
        public List<Reservation> GetAllReservationByCustomerId(int id);
    }
}
