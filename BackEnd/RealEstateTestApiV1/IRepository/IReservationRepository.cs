using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IReservationRepository
    {
        public List<Reservation> GetAllReservation();
        public Reservation CreateReservation(Reservation reservation);
        public Reservation UpdateReservation(Reservation reservation);
        public Reservation FindByID(int id);
    }
}
