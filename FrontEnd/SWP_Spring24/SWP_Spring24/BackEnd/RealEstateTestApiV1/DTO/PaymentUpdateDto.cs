namespace RealEstateTestApi.DTO
{
    public class PaymentUpdateDto
    {
        public int id { get; set; }
        public string PaymentMethod { get; set; }
        public bool Status { get; set; }
    }
}
