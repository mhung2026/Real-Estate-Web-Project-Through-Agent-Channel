using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IPaymentService
    {
        public Payment GetPaymentById(int id);
        public List<Payment> GetAllPayment();
        public Payment CreatePayment(PaymentCreateDto dto);
        public Payment UpdatePayment(PaymentUpdateDto dto);
    }
}
