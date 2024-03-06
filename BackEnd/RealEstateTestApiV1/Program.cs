using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;
using RealEstateTestApi.ServiceImpl;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//config cho swagger
builder.Services.AddSwaggerGen(options =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter a valid JWT beare token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme

        }
    };
    options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {securityScheme, new string[]{} }
    });
});

builder.Services.AddDbContext<SWPRealEstateContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RealEstateDB"));
});

//cau hinh api 
builder.Services.AddControllers().AddNewtonsoftJson(options =>

    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

//repository map
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<IDirectRepository, DirectRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRealEstateRepository, RealEstateRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IRealEstateImageRepository, RealEstateImageRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IWalletRepository, WalletRepository>();
builder.Services.AddScoped<IWalletHistoryRepository, WalletHistoryRepository>();
builder.Services.AddScoped<IReservationTimeRepository, ReservationTimeRepository>();







//service map
builder.Services.AddScoped<ILocationService, LocationServiceImpl>();
builder.Services.AddScoped<IDirectService, DirectServiceImpl>();
builder.Services.AddScoped<IAccountService, AccountServiceImpl>();
builder.Services.AddScoped<IRoleService, RoleServiceImpl>();
builder.Services.AddScoped<IRealEstateService, RealEstateServiceImpl>();
builder.Services.AddScoped<IPaymentService, PaymentServiceImpl>();
builder.Services.AddScoped<IRealEstateImageService, RealEstateImageServiceImpl>();
builder.Services.AddScoped<IReservationService, ReservationServiceImpl>();
builder.Services.AddScoped<IWalletService, WalletServiceImpl>();
builder.Services.AddScoped<IWalletHistoryService, WalletHistoryServiceImpl>();
builder.Services.AddScoped<IReservationTimeService, ReservationTimeServiceImpl>();





//configure security
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = "http://firstrealestate-001-site1.anytempurl.com",
    //ValidAudience ko co s cuoi cung
    ValidAudience = "http://firstrealestate-001-site1.anytempurl.com",
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("helloearththisismysecrectkeyforjwt123456789"))
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//cau hinh cors backend front end 
app.UseCors(c => c.SetIsOriginAllowed(isOriginAllowed => true).AllowCredentials().AllowAnyHeader().AllowAnyMethod());


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();