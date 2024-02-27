using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IPaymentRepository
    {
        public List<Payment> GetAllPayment();
        public Payment CreatePayment(Payment payment);
        public Payment UpdatePayment(Payment payment);
        public Payment GetPaymentById(int id);
    }
}
