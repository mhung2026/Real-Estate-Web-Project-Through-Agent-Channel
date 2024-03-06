using Microsoft.IdentityModel.Tokens;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RealEstateTestApi.ServiceImpl
{
    public class AccountServiceImpl : IAccountService
    {
        private IAccountRepository accountRepository;
        public AccountServiceImpl(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        public UserTokenDto loginIntoServer(LoginDto loginDto)
        {
            Account account = accountRepository.findUsernameAndPasswordToLogin(loginDto);
            UserLoginBasicInformationDto dto = new UserLoginBasicInformationDto();
            if (account != null)
            {
              
                dto.AccountId = account.Id;
                dto.Username = account.Username;
                dto.Email = account.Email;
                dto.Password = account.Password;
                dto.RoleName = account.Role.RoleName;
            }

            if (account != null && dto.Email != null && dto.Password !=null)
            {
                var access_Token = createJwtToken(account);
                UserTokenDto userTokenDto = new UserTokenDto()
                {
                    accessToken = access_Token,
                    userLoginBasicInformationDto = dto

                };

                return userTokenDto;
            }
            return null;
        }

        
        public string createJwtToken(Account account)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("helloearththisismysecrectkeyforjwt123456789")
            );
            var credentials = new SigningCredentials(
                symmetricSecurityKey,
                SecurityAlgorithms.HmacSha256
            );
         
            var userCliams = new List<Claim>();
            userCliams.Add(new Claim("username", account.Username));
            userCliams.Add(new Claim("password", account.Password));
            userCliams.Add(new Claim(ClaimTypes.Role, account.Role.RoleName));


            var jwtToken = new JwtSecurityToken(
                issuer: "http://firstrealestate-001-site1.anytempurl.com",
                expires: DateTime.Now.AddHours(5),
                signingCredentials: credentials,
                claims: userCliams,
                audience: "http://firstrealestate-001-site1.anytempurl.com"
            );
            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return token;
        }

        public Account createAccount(AccountDto dto)
        {
            Account account = new Account()
            {
                RoleId = dto.RoleId,
                Address = dto.Address,
                Username = dto.Username,
                Password = dto.Password,
                CreateAt = dto.CreateAt,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Status = true
            };

            if (account == null)
            {
                return null;
            }
            accountRepository.createAccount(account);
            return account;
        }

    }
}
