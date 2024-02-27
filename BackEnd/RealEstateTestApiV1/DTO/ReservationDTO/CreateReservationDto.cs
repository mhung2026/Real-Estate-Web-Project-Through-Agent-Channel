namespace RealEstateTestApi.DTO.ReservationDTO
{
    public class CreateReservationDto
    {
        public int RealEstateId { get; set; }
        public int CustomerId { get; set; }
        public string? BookingTime { get; set; }
        public DateTime? BookingDate { get; set; }
    }
}
