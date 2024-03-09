using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public PaymentRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
        public Payment CreatePayment(Payment payment)
        {
            swpRealEstateContext.Payments.Add(payment);
            swpRealEstateContext.SaveChanges();
            return payment;
        }

        public List<Payment> GetAllPayment()
        {
            List<Payment> ListPayment = swpRealEstateContext.Payments.Where(P => P.Status == true).ToList();
            return ListPayment;
        }

        public Payment GetPaymentById(int id)
        {
            Payment payment = swpRealEstateContext.Payments.FirstOrDefault(x=>x.Id == id);
            return payment;
        }

        public Payment UpdatePayment(Payment payment)
        {
            swpRealEstateContext.Payments.Update(payment);
            swpRealEstateContext.SaveChanges();
            return payment;
        }
    }
}
