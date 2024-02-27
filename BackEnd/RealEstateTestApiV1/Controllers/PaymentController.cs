using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;

namespace RealEstateTestApi.Controllers
{
    [Route("api/payment/")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentService paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }


        [HttpGet]
        [Route("GetPaymentById/{id}")]
        public IActionResult GetPaymentById(int id)
        {
            try
            {
                Payment payment = paymentService.GetPaymentById(id);
                return Ok(payment);
            }
            catch (Exception ex)
            {
                return BadRequest("Không thể lấy dữ liệu lên, vui lòng thử lại");
            }
        }

        [HttpGet]
        [Route("GetAllPayment")]
        public IActionResult GetAllPayment()
        {
            try
            {
                List<Payment> payments = paymentService.GetAllPayment();
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return BadRequest("Không thể lấy dữ liệu lên, vui lòng thử lại");
            }
        }

        [HttpPost]
        [Route("CreatePayment")]
        public IActionResult CreatePayment(PaymentCreateDto dto)
        {
            try
            {
                Payment payment = paymentService.CreatePayment(dto);
                if (payment == null || payment.PaymentMethod.IsNullOrEmpty())
                {
                    return BadRequest("Payment không được để trống");
                }
                return Ok("tạo Payment thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("xảy ra lỗi khi tạo Payment mới");
            }
        }


        [HttpPut]
        [Route("UpdatePayment/{id}")]
        public IActionResult UpdatePayment(int id, PaymentUpdateDto dto)
        {
            try
            {
                Payment payment = paymentService.GetPaymentById(id);
               
                if (payment == null)
                {
                    return BadRequest("Không tìm thấy payment cần cập nhật");
                }
                if (payment.PaymentMethod.IsNullOrEmpty())
                {
                    return BadRequest("PaymentMethod không được để trống");
                }
                paymentService.UpdatePayment(dto);
                return Ok("Update Payment thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("xảy ra lỗi khi update payment");
            }
        }


        //Hiệp có chỗ chưa clean lắm dòng 94
       /* [HttpPut]
        [Route("UpdatePayment/{idPayment}")]
        public IActionResult UpdatePayment(
          [FromRoute] int idPayment,
          [FromBody] PaymentUpdateDto payment
           )
        {
            try
            {
                if (idPayment != payment.id)
                {
                    return BadRequest("idPayment trong Router khong bang idPayment trong body");
                }
                Payment p = paymentService.updatePayment(payment);
                if (p == null)
                {
                    return BadRequest("Khong tim thay Payment");
                }
                if (p.PaymentMethod.IsNullOrEmpty())
                {
                    return BadRequest("PaymentMethod khong duoc de trong");
                }
                paymentService.updatePayment(payment);
                return Ok("Update Payment thanh cong");

            }
            catch (Exception ex)
            {
                return BadRequest("xay ra loi khi UpdatePayment");
            }
        }*/
    }
}
