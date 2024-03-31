namespace RealEstateTestApi.DTO
{
    public class AgencyPostUpdateDTO
    {
        //thêm reservation ID
        //bỏ contract vào bảng postcontractdto
        public string? FirebaseId { get; set; }              
        public int? ReservationId { get; set; }
        public int Status { get; set; }
    }
}
