using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class RealEstateServiceImpl : IRealEstateService
    {
        private IRealEstateRepository realEstateRepository;
        private ILocationRepository locationRepository;
        private IRealEstateImageRepository realEstateImageRepository;
        public RealEstateServiceImpl(IRealEstateRepository realEstateRepository, ILocationRepository locationRepository, IRealEstateImageRepository realEstateImageRepository)
        {
            this.realEstateRepository = realEstateRepository;
            this.locationRepository = locationRepository;
            this.realEstateImageRepository = realEstateImageRepository;
        }

        public async Task<RealEstate> investorCreateRealEstateUsingInvestorId(int id, InvestorRealEstateDto dto)
        {
            RealEstate realEstate = null;
           
                Location location = new Location()
                {
                    Ward = dto.Ward,
                    District = dto.District,
                    City = dto.City,
                    Status = true
                };
                Location locationAsync = await locationRepository.createLocationAsync(location);
                if (locationAsync.Id != -1)
                {
                    realEstate = new RealEstate()
                    {
                        InvestorId = id,
                        FirebaseId = dto.FirebaseId,
                        PayId = dto.PayId,
                        LocationId = locationAsync.Id,
                        DirectId = dto.DirectId,
                        RealestateName = dto.RealestateName,
                        RoomNumber = dto.RoomNumber,
                        Address = dto.Address,
                        Length = dto.Length,
                        Width = dto.Width,
                        Perimeter = dto.Perimeter,
                        Area = dto.Area,
                        LegalStatus = dto.LegalStatus,
                        Price = dto.Price,
                        Discount = dto.Discount,
                        Discription = dto.Discription,
                        Status = dto.Status,
                    };
                //chờ tạo đồng bộ trong database sau đó mới thêm vào bảng image url
                await realEstateRepository.createRealEstateAsync(realEstate);     
                if(realEstate!= null)
                {
                    foreach (RealEstateImageDto imageDto in dto.listRealEstateImageUrl)
                    {
                        RealEstateImage realEstateImage = new RealEstateImage()
                        {
                            RealEstateId = realEstate.Id,
                            ImageName = imageDto.ImageName,
                            ImageUrl = imageDto.ImageUrl,
                            Status = true
                        };
                        realEstateImageRepository.createRealEstateImage(realEstateImage);
                    }
                }
                   
                }           
            return realEstate;
        }

        // ko sử dụng function này
        public List<RealEstateInformationGetDto> GetRealEstateInformationGetDto()
        {
            List<RealEstate> realEstate =  realEstateRepository.getAllRealEstateForView();
            List<RealEstateInformationGetDto> listDto = new List<RealEstateInformationGetDto>();
            List<RealEstateImageDto> listImageDto = new List<RealEstateImageDto>();
            /*foreach (var item in realEstate)
            {
                foreach(var urlDto in item.RealEstateImages)
                {
                    RealEstateImageDto realEstateImageDto = new RealEstateImageDto()
                    {
                        ImageUrl = urlDto.ImageUrl,
                        Status = urlDto.Status
                    };
                    listImageDto.Add(realEstateImageDto);
                }
            }*/

            
            foreach (var dto in realEstate)
            {
                foreach(var  imageDto in dto.RealEstateImages)
                {
                    listImageDto.Add(new RealEstateImageDto()
                    {
                        ImageUrl = imageDto.ImageUrl,
                        Status = imageDto.Status
                    });
                    RealEstateInformationGetDto realEstateInformationGetDto = new RealEstateInformationGetDto()
                    {
                        Id = dto.Id,
                        RealestateName = dto.RealestateName,
                        InvestorId = dto.InvestorId,
                        InvestorName = dto.Investor.Username,
                        payment_Method_Name = dto.Pay.PaymentMethod,
                        Address = dto.Address,
                        Ward = dto.Location.Ward,
                        District = dto.Location.District,
                        City = dto.Location.City,
                        DirectName = dto.Direct.DirectName,
                        RoomNumber = dto.RoomNumber,
                        Length = dto.Length,
                        Width = dto.Width,
                        Perimeter = dto.Perimeter,
                        Area = dto.Area,
                        LegalStatus = dto.LegalStatus,
                        Price = dto.Price,
                        Discount = dto.Discount,
                        Discription = dto.Discription,
                        Status = dto.Status,
                        listRealEstateImageUrl = listImageDto
                    };
                    listDto.Add(realEstateInformationGetDto);

                    /*listDto.Add(new RealEstateInformationGetDto()
                    {
                        Id = dto.Id,
                        RealestateName = dto.RealestateName,
                        InvestorId = dto.InvestorId,
                        InvestorName = dto.Investor.Username,
                        payment_Method_Name = dto.Pay.PaymentMethod,
                        Address = dto.Address,
                        Ward = dto.Location.Ward,
                        District = dto.Location.District,
                        City = dto.Location.City,
                        DirectName = dto.Direct.DirectName,
                        RoomNumber = dto.RoomNumber,
                        Length = dto.Length,
                        Width = dto.Width,
                        Perimeter = dto.Perimeter,
                        Area = dto.Area,
                        LegalStatus = dto.LegalStatus,
                        Price = dto.Price,
                        Discount = dto.Discount,
                        Discription = dto.Discription,
                        Status = dto.Status,
                       
                    });*/
                }               
            }
            return listDto;
        }


        // --- //


        public void updatePostRealEstateById(int realEstateId, PostUpdateDto dto)
        {
            RealEstate realEstate = realEstateRepository.getRealEstateById(realEstateId);
            realEstate.DirectId = dto.DirectId;
            realEstate.PayId = dto.PayId;
            realEstate.RealestateName = dto.RealestateName;
            realEstate.Address = dto.Address;
            realEstate.RoomNumber = dto.RoomNumber;
            realEstate.Length = dto.Length;
            realEstate.Width = dto.Width;
            realEstate.Perimeter = dto.Perimeter;
            realEstate.Area = dto.Area;
            realEstate.LegalStatus = dto.LegalStatus;
            realEstate.Price = dto.Price;
            realEstate.Discount = dto.Discount;
            realEstate.Discription = dto.Discription;
            realEstate.Location.Ward = dto.Ward;
            realEstate.Location.District = dto.District;
            realEstate.Location.City = dto.City;
            realEstate.Status =dto.Status;
            foreach (var item in dto.listRealEstateImageUrl)
            {
                RealEstateImage realEstateImage = realEstateImageRepository.findRealEstateImageById(item.Id);
                if(realEstateImage != null)
                {
                  realEstateImage.ImageName = item.ImageName;
                  realEstateImage.ImageUrl = item.ImageUrl;
                  realEstateImageRepository.updateRealEstateImage(realEstateImage);
                }

            }
            realEstateRepository.updatePostRealEstate(realEstate);
         }

       /* public void updatePostImageById(int id, List<ImagePostUpdateDto> dto)
        {
            List<RealEstateImage> listFind = realEstateImageRepository.getAllRealEstateImageByRealEstateId(id);
            foreach (var item in dto)
            {
                RealEstateImage realEstateImage = realEstateImageRepository.findRealEstateImageById(item.RealEstateId);
                if(realEstateImage!= null)
                {
                    realEstateImage.ImageUrl = item.ImageUrl;
                }
               
            }
            
        }*/
    }
}
