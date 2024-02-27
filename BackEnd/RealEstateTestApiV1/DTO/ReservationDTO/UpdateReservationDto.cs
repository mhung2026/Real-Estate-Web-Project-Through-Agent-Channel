namespace RealEstateTestApi.DTO.ReservationDTO
{
    public class UpdateReservationDto
    {
        public int RealEstateId { get; set; }
        public int? CustomerId { get; set; }
        public int? AgencyId { get; set; }
        public int Status { get; set; }
        public DateTime? BookingDate { get; set; }
        public string? BookingTime { get; set; }
    }
}
