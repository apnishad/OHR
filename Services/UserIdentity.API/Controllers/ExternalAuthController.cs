using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using UserIdentity.API.Auth;
using UserIdentity.API.Helpers;
using UserIdentity.API.Models;
using UserIdentity.API.ViewModels;

namespace UserIdentity.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExternalAuthController:Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly HttpClient Client = new HttpClient();
        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        public ExternalAuthController(IOptions<FacebookAuthSettings> fbAuthSettingsAccessor, UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
            _userManager = userManager;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;

        }

        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody] FacebookAuthViewModel model)
        {
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);
            if(!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest(Errors.AddErrorsToModelState("login_failure","Invalidfacebook Token.",ModelState));
            }

            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);
            var user = await _userManager.FindByEmailAsync(userInfo.EMail);
            if(user==null)
            {
                var appUser = new AppUser
                {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    FacebookId = userInfo.Id,
                    Email = userInfo.EMail,
                    UserName = userInfo.EMail,
                    PictureUrl = userInfo.Picture.Data.Url
                };
                var result  = await _userManager.CreateAsync(appUser,Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0,8));
                if(!result.Succeeded)
                {
                    return  new BadRequestObjectResult(Errors.AddErrorsToModelState(result,ModelState));
                }
                await _appDbContext.Customers.AddAsync(new Customer{
                    IdentityId = appUser.Id,
                    Location = "",
                    Gender = userInfo.Gender
                });
                await _appDbContext.SaveChangesAsync();
            }
            var localUser = await _userManager.FindByNameAsync(userInfo.EMail);
            if(localUser == null)
            {
                return  BadRequest(Errors.AddErrorsToModelState("login_failure","failed to create local user account.",ModelState));
            }
            var cIdentity = _jwtFactory.GenerateClaimsIdentity(localUser.UserName,localUser.Id);
            cIdentity.AddClaim(new Claim("UserType",localUser.UserType));
            var jwt = await Tokens.GenerateJwt(cIdentity,_jwtFactory,localUser.UserName,_jwtOptions, new JsonSerializerSettings{Formatting=Formatting.Indented});
            return new OkObjectResult(jwt);       
        }
    }
}