
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UserIdentity.API.Auth;
using UserIdentity.API.Models;
using UserIdentity.API.Helpers;
using System.Security.Claims;
using UserIdentity.API.ViewModels;
using Newtonsoft.Json;

namespace UserIdentity.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController:Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        
        public AuthController(UserManager<AppUser> userManager,IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var identity = await GetClaimsIdentity(credentials.UserName,credentials.Password);
            Console.WriteLine(identity.FindFirst("UserType").Value);
            if(identity == null)
            {
                return BadRequest(Errors.AddErrorsToModelState("login failure","Invalid username or password",ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity,_jwtFactory,credentials.UserName,_jwtOptions,new JsonSerializerSettings{
                Formatting = Formatting.Indented});
            
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string username, string password)
        {
            if(string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }
           var userToVerify = await _userManager.FindByNameAsync(username);
           if(userToVerify == null)
           {
                return await Task.FromResult<ClaimsIdentity>(null);
           }

           if(await _userManager.CheckPasswordAsync(userToVerify,password))
           {
                var cIdentity = _jwtFactory.GenerateClaimsIdentity(username,userToVerify.Id);
                cIdentity.AddClaim(new Claim("UserType",userToVerify.UserType));
                return await Task.FromResult(cIdentity);
           }

            return await Task.FromResult<ClaimsIdentity>(null);

        }
    }
}