using UserIdentity.API.Models;
using AutoMapper;

namespace UserIdentity.API.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile:Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel,AppUser>().ForMember(au=>au.UserName,map=>map.MapFrom(vm => vm.EMail));
        }
    }
}