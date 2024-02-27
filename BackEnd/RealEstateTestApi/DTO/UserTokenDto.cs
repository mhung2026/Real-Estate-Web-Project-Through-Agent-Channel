namespace RealEstateTestApi.DTO
{
    public class UserTokenDto
    {
        public string accessToken { get; set; }     
        public UserLoginBasicInformationDto userLoginBasicInformationDto { get; set; }
    }
}
