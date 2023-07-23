using Microsoft.EntityFrameworkCore;
using UserIdentity.API.Models;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using UserIdentity.API.Auth;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using UserIdentity.API.Helpers;
using Microsoft.AspNetCore.Identity;
using FluentValidation.AspNetCore;
using FluentValidation;
using AutoMapper;
using UserIdentity.API.ViewModels.Validations;
using System.Reflection;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using UserIdentity.API.Extensions;

var builder = WebApplication.CreateBuilder(args);
const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH";

SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
// Add services to the container.

builder.Services.AddControllers();/*.AddFluentValidation(vl=>{
    vl.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
});*/
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<ApplicationDbContext>(options=>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSingleton<IJwtFactory,JwtFactory>();
builder.Services.TryAddTransient<IHttpContextAccessor,HttpContextAccessor>();
var jwtAppSettingOptions = builder.Configuration.GetSection(nameof(JwtIssuerOptions));
Console.WriteLine(jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)]);
builder.Services.Configure<JwtIssuerOptions>(options=>{
    options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
    options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
    options.SigningCredentials = new SigningCredentials(_signingKey,SecurityAlgorithms.HmacSha256);
});
var tokenValidationParameters = new TokenValidationParameters{
    ValidateIssuer = true,
    ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],
    ValidateAudience = true,
    ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = _signingKey,
    RequireExpirationTime = false,
    ValidateLifetime = true,
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddAuthentication(options=>{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(configureOptions=>{
    configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
    configureOptions.TokenValidationParameters = tokenValidationParameters;
    configureOptions.SaveToken = true;
});
builder.Services.AddAuthorization(options=>{
    options.AddPolicy("ApiUser",policy=>{
        policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol,Constants.Strings.JwtClaims.ApiAccess);
    });
});

builder.Services.AddAuthorization(options=>{
    options.AddPolicy("AdminRole",policy=>policy.RequireRole("Admin"));
});
var blder = builder.Services.AddIdentityCore<AppUser>(o=>{
    o.Password.RequireDigit = false;
    o.Password.RequireLowercase = false;
    o.Password.RequireUppercase = false;
    o.Password.RequireNonAlphanumeric = false;
    o.Password.RequiredLength  = 6;
});
blder = new IdentityBuilder(blder.UserType,typeof(IdentityRole),blder.Services);
blder.AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddMvc();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else{
    app.UseHsts();
}

app.UseExceptionHandler(builder=>{
    builder.Run(async context=>{
        context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
        context.Response.Headers.Add("Access-Control-Allow-Origin","*");
        var error = context.Features.Get<IExceptionHandlerFeature>();
        if(error!=null)
        {
            context.Response.AddApplicationError(error.Error.Message);
            await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
        }
    });
});

app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
