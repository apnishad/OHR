using System.Security.Claims;
using UserIdentity.API.Auth;
using UserIdentity.API.Models;
using Newtonsoft.Json;

namespace UserIdentity.API.Helpers
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
                var response = new {
                    id= identity.Claims.Single(c=>c.Type == "id").Value,
                    auth_token = await jwtFactory.GenerateEncodedToken(userName,identity),
                    expires=(int)jwtOptions.ValidFor.TotalSeconds
                };
                return JsonConvert.SerializeObject(response,serializerSettings);
        }
    }
}