using RealEstateTestApi.Data;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class PaymentServiceImpl : IPaymentService
    {
        private IPaymentRepository paymentRepository;
        public PaymentServiceImpl(IPaymentRepository paymentRepository)
        {
            this.paymentRepository = paymentRepository; 
        }

        public Payment CreatePayment(PaymentCreateDto dto)
        {
            Payment payment = new Payment()
            {
                PaymentMethod = dto.paymentMethod,
                Status = true
            };
            
            if (payment == null)
            {
                return null;
            }
            paymentRepository.CreatePayment(payment);
            return payment;
        }

        public List<Payment> GetAllPayment()
        {
            List<Payment> listPayment = paymentRepository.GetAllPayment();
            return listPayment;
        }

        public Payment GetPaymentById(int id)
        {
            Payment payment = paymentRepository.GetPaymentById(id);
            return payment;
        }

        public Payment UpdatePayment(PaymentUpdateDto dto)
        {
            Payment payment = GetPaymentById(dto.id);
            if (payment == null)
            {
                return null;
            }
            payment.PaymentMethod = dto.PaymentMethod;
            payment.Status = dto.Status;
            paymentRepository.UpdatePayment(payment);
            return payment;
        }
    }
}
