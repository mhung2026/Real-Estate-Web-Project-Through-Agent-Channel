using RealEstateTestApi.DTO.ReservationDTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class ReservationServiceImpl : IReservationService
    {
        IReservationRepository reservationRepository;
        public ReservationServiceImpl(IReservationRepository reservationRepository)
        {
            this.reservationRepository = reservationRepository;
        }
        public Reservation CreateReservation(CreateReservationDto reservationdto)
        {
            if (reservationdto == null)
            {
                return null;
            }
            Reservation reservation = new Reservation()
            {
                CustomerId = reservationdto.CustomerId,
                RealEstateId = reservationdto.RealEstateId,
                AgencyId = null,
                BookingDate = reservationdto.BookingDate,
                BookingTime = reservationdto.BookingTime,
                CreateAt = DateTime.Now,
                UpdateAt = null,
                Status = 1
            };
            if (reservation != null)
            {
                reservationRepository.CreateReservation(reservation);
                return reservation;
            }
            return null;

        }

        public List<Reservation> GetAlllReservation()
        {
            var list = reservationRepository.GetAllReservation();
            return list;
        }

        public Reservation UpdateReservation(UpdateReservationDto reservation)
        {
            if (reservation == null)
            {
                return null;
            }
            Reservation re = new Reservation()
            {
                CustomerId = reservation.CustomerId,
                AgencyId = reservation.AgencyId,
                RealEstateId = reservation.RealEstateId,
                UpdateAt = DateTime.Now,
                BookingDate = reservation.BookingDate,
                BookingTime = reservation.BookingTime,
                Status = reservation.Status,
            };
            reservationRepository.UpdateReservation(re);
            return re;
        }
    }
}
